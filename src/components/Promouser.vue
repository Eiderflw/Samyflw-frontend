<template>
    <div class="promo">
        <Toast />
        <Panel>
            <template #header>
                <div class="flex items-center gap-2 flex-end w-full justify-content-between">
                    <h1 class="m-0">Promoción</h1>
                    <div class="botones flex gap-2">
                        <Button icon="pi pi-plus" label="Ordenar" severity="success" @click="modalOrdenar = true" />
                        <Button :label="`Saldo: $${User.saldo}`" severity="info" />
                    </div>
                </div>
            </template>
            <DataTable :value="ordenes" sortField="estado" :sortOrder="1" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 100%">
                <Column field="fecha" header="Fecha" sortable style="min-width: 11rem;">
                    <template #body="props">
                        {{ props.data.fecha.slice(0, 10) }} {{ props.data.fecha.slice(11, 16) }}
                    </template>
                </Column>
                <Column field="service" header="ID Service" sortable />
                <Column field="descripcion" header="Descripcion" class="word-wrap" sortable />
                <Column field="cantidad" header="Cantidad" />
                <Column field="link" header="Publicación">
                    <template #body="props">
                        <a :href="props.data.link" target="_blank" rel="noopener noreferrer">Ver publicación</a>
                    </template>
                </Column>
                <Column field="pagar" header="Pago" sortable />
                <Column field="order" header="Order ID" sortable />
            </DataTable>
        </Panel>
        <Dialog v-model:visible="modalOrdenar" header="Ordenar servicio" :style="{ width: '40rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="center" :modal="true" :draggable="false">
            <div class="flex justify-content-center">
                <form ref="formServicio" style="width: 30rem;">
                    <div class="form-container">
                        <div class="flex flex-column gap-1 mb-2">
                            <label class="font-bold block">Servicios</label>
                            <Dropdown v-model="servicioSelect" showClear :options="serviciosActivos" filter optionLabel="name" @update:modelValue="selectServicio" placeholder="Selecciona servicio">
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <div class="flex flex-column gap-1 mb-2">
                            <label class="font-bold block">Cantidad</label>
                            <InputText type="number" v-model="paquetePromocion.cantidad" :min="min" :max="max" @update:modelValue="calcularPago" aria-describedby="cantidad-help" />
                            <small id="cantidad-help">{{ help_cantidad }}</small>
                        </div>
                        <div class="flex flex-column gap-1 mb-2">
                            <label class="font-bold block">Link</label>
                            <InputText type="url" v-model="paquetePromocion.link" aria-describedby="url-help" />
                            <small id="url-help">Del perfil o publicación a aumentar reacciones o seguidores</small>
                        </div>
                        <div class="flex flex-column gap-1 mb-2">
                            <label class="font-bold block">$ Pagar</label>
                            <InputText type="number" id="saldo" disabled v-model="paquetePromocion.pagar" />
                            <small id="saldo">Advertencia: Revise bien el saldo, se descontará de tu saldo</small>
                        </div>
                    </div>
                </form>
            </div>
            <template #footer>
                <Button label="Cancelar" @click="modalOrdenar = false" autofocus text severity="danger" />
                <Button label="Ordenar" :disabled="btnOrden" @click="ordenar" />
            </template>
        </Dialog>
    </div>
</template>
<script>
import axios from 'axios';
import { useStoreEvento } from "../store";

export default {
    data: () => ({
        API: import.meta.env.VITE_APP_API,
        store: null,
        User: {
            saldo: '',
            _id: null
        },
        token: null,
        btnOrden: false,
        servicioSelect: null,
        precioRate: 0,
        ordenes: [],
        modalOrdenar: false,
        min: 1,
        max: 2,
        serviciosActivos: [],
        paquetePromocion: {
            service: null,
            descripcion: null,
            cantidad: null,
            link: null,
            pagar: 0,
            idUsuario: null
        },
        help_cantidad: 'Cantidad del servicio.'
    }),
    methods: {
        selectServicio(event) {
            console.log(event);
            this.help_cantidad = `Puedes ordenar entre ${event.min} y ${event.max}`;
            this.paquetePromocion.service = event.service;
            this.paquetePromocion.descripcion = event.name;
            this.min = parseInt(event.min);
            this.max = parseInt(event.max);
            this.precioRate = (parseFloat(event.rate) / 1000);
            this.calcularPago();
        },
        calcularPago() {
            this.paquetePromocion.pagar = this.paquetePromocion.cantidad * this.precioRate;
        },
        async getServiciosActive() {
            await axios.get(`${this.API}/promocion/servicesActive`, this.token).then((response) => {
                this.serviciosActivos = response.data;
            }).catch((error) => {
                switch (error.response.data.statusCode) {
                    case 401:
                        //Se le termino la sesión
                        this.store.clearUser();
                        this.$router.push('/login');
                        break;
                    default:
                        this.$toast.add({
                            severity: "error",
                            summary: "Obtener servicios Activos",
                            detail: "Sucedió un error, Comuniquese con soporte",
                            life: 1500,
                        });
                        console.log("Error: ", error);
                        break;
                }
            });
        },
        async getUserInfo() {
            await axios.get(`${this.API}/usuario/${this.User._id}`, this.token).then(response => {
                this.User = response.data;
            }).catch((error) => {
                switch (error.response.data.statusCode) {
                    case 401:
                        console.log(error);
                        break;
                    default:
                        this.$toast.add({
                            severity: "error",
                            summary: "Obtener usuario",
                            detail: "Sucedió un error, Comuniquese con soporte",
                            life: 1500,
                        });
                        console.log("Error: ", error);
                        break;
                }
            });
        },
        async ordenar() {
            if (this.paquetePromocion.service != null) {
                this.paquetePromocion.cantidad = parseInt(this.paquetePromocion.cantidad);
                if (this.paquetePromocion.cantidad >= this.min && this.paquetePromocion.cantidad <= this.max) {
                    this.paquetePromocion.pagar = parseFloat(this.paquetePromocion.pagar);
                    if (parseFloat(this.User.saldo) >= this.paquetePromocion.pagar) {
                        if (this.paquetePromocion.link != null) {
                            this.btnOrden = true;
                            await axios.post(`${this.API}/usuario/ordenar`, this.paquetePromocion, this.token).then(response => {
                                console.log(response);
                                if (response.data) {
                                    this.$toast.add({ severity: 'success', summary: 'Ordenar', detail: 'Orden creada con éxito', life: 1500 });
                                    this.servicioSelect = null;
                                    this.$refs.formServicio.reset();
                                    this.getMisOrdenes();
                                    this.getUserInfo();
                                    this.getServiciosActive();
                                } else {
                                    this.$toast.add({ severity: 'error', summary: 'Ordenar', detail: 'No se pudo crear la orden', life: 1500 });
                                }
                            }).catch(error => {
                                console.log('Error orden; ', error);
                                this.$toast.add({ severity: 'error', summary: 'Ordenar', detail: 'Ocurrió un problema creando la orden', life: 1500 });
                            });
                            this.btnOrden = false;
                        } else {
                            this.$toast.add({ severity: 'info', summary: 'Ordenar', detail: 'Ingresa el link de la publicación o perfil', life: 1500 });
                        }
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Ordenar', detail: 'No tienes suficiente saldo', life: 1500 });
                    }
                } else {
                    this.$toast.add({ severity: 'info', summary: 'Ordenar', detail: `La cantidad debe estar entre ${this.min} y ${this.max}`, life: 1500 });
                }
            } else {
                this.$toast.add({ severity: 'info', summary: 'Ordenar', detail: 'Debes escoger un servicio', life: 1500 });
            }
        },
        async getMisOrdenes() {
            await axios.get(`${this.API}/usuario/${this.store.getUsuario().usuario}/ordenes`, this.token).then(response => {
                this.ordenes = response.data.ordenes;
            }).catch(error => {
                switch (error.response.data.statusCode) {
                    case 401:
                        //Se le termino la sesión
                        this.store.clearUser();
                        this.$router.push('/login');
                        break;
                    default:
                        this.$toast.add({ severity: 'danger', summary: 'Obteniendo ordenes', detail: error.response.data.message, life: 1500 });
                        console.log('Error: ', error);
                        break;
                }
            });
        }
    },
    async created() {
        this.store = useStoreEvento();
        if (!this.store.isActive()) {
            this.$router.push("/login");
        }
        this.token = {
            headers: {
                Authorization: `Bearer ${this.store.getToken()}`,
            },
        }
        this.User._id = this.store.getId();
        this.paquetePromocion.idUsuario = this.store.getId();
        await this.getUserInfo();
        await this.getMisOrdenes();
        await this.getServiciosActive();
    }
}
</script>
