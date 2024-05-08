<template>
    <Panel v-if="admin == false" class="EventoEspecial">
        <Toast />
        <template #header>
            <div class="flex items-center gap-2 flex-end w-full justify-content-between">
                <h1 class="m-0">Eventos</h1>
            </div>
        </template>

        <DataTable :value="Evento" :sortOrder="-1" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 100%">
            <Column header="Categoria" field="categoria" sortable>

            </Column>
            <Column header="Fecha Inicio" field="fecha_inicio" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.fecha_inicio != null ? slotProps.data.fecha_inicio.slice(0, 10) : '' }}

                </template>
            </Column>
            <Column header="Fecha Final" field="fecha_fin" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.fecha_fin != null ? slotProps.data.fecha_fin.slice(0, 10) : '' }}

                </template>
            </Column>
            <Column header="Aplicar">
                <template #body="slotProps">
                    <Button icon="pi pi-check-circle"
                        @click="aplicar(slotProps.data._id, slotProps.data.categoria)"></Button>

                </template>
            </Column>
        </DataTable>
    </Panel>
    <Panel v-if="admin == true" class="EventoEspecial">
        <Toast />
        <template #header>
            <div class="flex items-center gap-2 flex-end w-full justify-content-between flex-wrap">
                <h1 class="m-0">Eventos</h1>
                <Button label="Evento" icon="pi pi-plus" @click="modalEvento = true" />
            </div>
        </template>

        <DataTable :value="Evento" :sortOrder="-1" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 100%">
            <Column header="Categoria" field="categoria" sortable>
            </Column>
            <Column header="Participantes" field="participantes" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.participantes.length }}

                </template>
            </Column>
            <Column header="Ganador" field="ganador">
            </Column>
            <Column header="Fecha Inicio" field="fecha_inicio" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.fecha_inicio != null ? slotProps.data.fecha_inicio.slice(0, 10) : '' }}

                </template>
            </Column>
            <Column header="Fecha Final" field="fecha_fin" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.fecha_fin != null ? slotProps.data.fecha_fin.slice(0, 10) : '' }}

                </template>
            </Column>
            <Column header="Estado" field="estado" sortable>
                <template #body="slotProps">
                    <Tag :severity="ponerEstado(slotProps.data.estado)" :value="slotProps.data.estado" />

                </template>
            </Column>
            <Column header="Acciones" field="_id">
                <template #body="slotProps">
                    <div>
                        <Button class="m-1" icon="pi pi-trash" outlined rounded severity="danger"
                            @click="verificacion(slotProps.data._id,)"></Button>
                    </div>

                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="modalEvento" :style="{ width: '47rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="top" :modal="true" :draggable="false">
            <template #header>
                <h3>Nuevo evento</h3>
            </template>
            <form ref="formPremio" class="formPremio">

                <label class="font-bold block">Categoria de participantes</label>
                <div class="card flex justify-content-center">
                    <SelectButton v-model="paquete.categoria" :options="Rangos" aria-labelledby="basic" />
                </div>
                <div class="flex flex-column gap-1">
                    <label class="font-bold block">Tipo premio</label>
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="paquete.tipo_premio" inputId="premio1" name="premio"
                                value="Efectivo" />
                            <label for="premio1" class="ml-2 cursor-pointer">Efectivo</label>
                        </div>
                        <div class="flex align-items-center">
                            <RadioButton v-model="paquete.tipo_premio" inputId="premio2" name="premio"
                                value="SaldoApi" />
                            <label for="premio2" class="ml-2 cursor-pointer">Saldo API</label>
                        </div>
                        <div class="flex align-items-center">
                            <RadioButton v-model="paquete.tipo_premio" inputId="premio3" name="premio" value="Objeto" />
                            <label for="premio3" class="ml-2 cursor-pointer">Objeto</label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-column gap-1 mt-2" v-if="paquete.tipo_premio != 'Objeto'">
                    <label for="premio" class="font-bold block">Premio</label>
                    <InputText id="premio" v-model="paquete.premios" placeholder="Monto" />
                    <small v-if="paquete.tipo_premio == 'Efectivo'">Ingresar monto y tipo de moneda, Ej: 10USD</small>
                    <small v-else>Ingresar monto en USD</small>
                </div>
                <div class="flex flex-column gap-1 mt-2">
                    <label for="premio" class="font-bold block">Bono carulla</label>
                    <InputText id="premioCarulla" v-model="paquete.bonoCarrulla" placeholder="Monto" />
                    <small>Ingresar monto Ej: 1000</small>
                </div>
                <div class="flex flex-column gap-1 mt-2">
                    <label for="cant" class="font-bold block">Cantidad de ganadores</label>
                    <InputText type="number" id="cant" v-model="paquete.cantidad_ganadores" min="1" />
                </div>


                <div class="disponibilidad flex flex-column gap-1 mt-1">
                    <label for="fecha_fin" class="font-bold block">Fecha sorteo</label>
                    <Calendar id="fecha_fin" v-model="fecha_rango" selectionMode="range" :minDate="new Date()"
                        :manualInput="false" dateFormat="yy-mm-dd" />
                    <small>Selecionar inicio y fin del evento</small>
                </div>
                <div class="flex flex-column gap-1 w-full mt-2">
                    <label for="cant" class="font-bold block">Criterio ganador</label>
                    <MultiSelect :maxSelectedLabels="3" v-model="paquete.criterio_ganador" :options="criterios"
                        optionLabel="criterio" placeholder="Selecciona criterio para decidir los ganadores"
                        display="chip" class="w-full">

                        <template #option="slotProps">
                            <div class="flex align-items-center">
                                <div>{{ slotProps.option.criterio }}</div>
                            </div>
                        </template>

                        <template #footer>
                            <div class="py-2 px-3">
                                <b>{{ paquete.criterio_ganador ? paquete.criterio_ganador.length : 0 }}</b> criterio {{
                                    ((paquete.criterio_ganador ? paquete.criterio_ganador.length : 0) > 1 ||
                                        (paquete.criterio_ganador ? paquete.criterio_ganador.length : 0) == 0) ? 's' : '' }} {{
                                    (paquete.criterio_ganador ? paquete.criterio_ganador.length : 0) == 1 ? 'seleccionado.'
                                        : 'seleccionados.' }}
                            </div>
                        </template>
                    </MultiSelect>
                </div>
            </form>

            <template #footer>
                <Button label="Cancelar" @click="modalEvento = false" text severity="danger" autofocus />
                <Button label="Crear" @click="crearEvento" severity="success" />
            </template>
        </Dialog>

        <Dialog v-model:visible="modalEliminar" :style="{ width: '47rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="top" :modal="true" :draggable="false">
            <template #header>
            </template>
            <div class="card flex justify-content-center">
                <h2>¿Esta seguro de eliminar el evento?</h2>
            </div>

            <template #footer>
                <Button label="No,cancelar" @click="modalEliminar = false" text severity="danger" />
                <Button label="Si,Eliminar" @click="Eliminar()" severity="success" autofocus />
            </template>
        </Dialog>

        <Dialog v-model:visible="modalAplicar" :style="{ width: '47rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="top" :modal="true" :draggable="false">
            <template #header>
            </template>
            <div class="card flex justify-content-center">
                <h2>confirmar Evento</h2>
            </div>

            <template #footer>
                <Button label="Cancelar" @click="(modalAplicar = false), 
            (verificacionEliminar = null)" text severity="danger" />
                <Button label="Comfirmar" @click="agregarParticipante()" severity="success" autofocus />
            </template>
        </Dialog>
    </Panel>
</template>
<script>
import axios from "axios";
import { useStoreEvento } from "../store";


export default {
    data: () => ({
        API: import.meta.env.VITE_APP_API,
        admin: false,
        modalEvento: false,
        Rangos: ['Rookie', 'Veteran', 'Pro', 'Pro+'],
        fecha_rango: null,
        verificacionEliminar: null,
        verificacionAplicar: null,
        categoriaEvento: null,
        modalEliminar: false,
        modalAplicar: false,
        paqueteParticipante: {
            participante: null,
            evento: null,
            categoria: null,
            categoriaParticipante: null,
        },
        paquete: {
            categoria: null,
            premios: null,
            bonoCarrulla: null,
            tipo_premio: null,
            criterio_ganador: [],
            participantes: [],
            cantidad_ganadores: 1,
            fecha_inicio: null,
            fecha_fin: null,

        },
        Evento: [],
        criterios: [
            {
                criterio: "Días hábiles mes actual",
                key: "Días"
            }, {
                criterio: "Horas en Live mes actual",
                key: "Horas"
            }, {
                criterio: "Diamantes mes actual",
                key: "Diamantes"

            }
        ],

    }),
    methods: {
        ponerEstado(estado) {
            if (estado == "Finalizado") {
                return "warning";
            } else if (estado == "En preparacion") {
                return "info";
            } else {
                return "success";
            }
        },

        aplicar(id, categoria) {
            if (!this.store.isActive()) {
                this.store.eventoID(id, categoria);
                this.$router.push('/login');
            } else {
                this.modalAplicar = true;
                this.verificacionAplicar = id;
                this.categoriaEvento = categoria
                console.log(categoria);
            }

        },
        verificacion(id) {
            this.verificacionEliminar = id;
            this.modalEliminar = true;
        },

        async crearEvento() {
            const regex = /^\d+[a-zA-Z]+$/; //Números seguido de letras
            if (this.paquete.tipo_premio == 'Objeto') {
                this.paquete.premios = '';
            }
            if (this.fecha_rango == null) {
                this.$toast.add({ severity: 'error', summary: 'Nuevo evento especial', detail: 'Debe colocar fecha de inicio y fecha fin', life: 1500 });
                return;
            }
            if (this.paquete.tipo_premio !== null) {
                if (this.paquete.categoria === null) {
                    this.$toast.add({ severity: 'error', summary: 'Nuevo evento especial', detail: 'Debe seleccionar una categoria', life: 1500 });
                    return;
                }
                if (this.paquete.tipo_premio == 'Efectivo') {
                    if (!regex.test(this.paquete.premios)) {
                        this.$toast.add({ severity: 'error', summary: 'Nuevo evento especial', detail: 'Formato del premio incorrecto', life: 1500 });
                        return;
                    }
                } else if (this.paquete.tipo_premio == 'SaldoApi') {
                    if (isNaN(this.paquete.premios)) {
                        this.$toast.add({ severity: 'error', summary: 'Nuevo evento especial', detail: 'El premio solo debe contener números', life: 1500 });
                        return;
                    }
                }
            } else {
                this.$toast.add({ severity: 'error', summary: 'Nuevo evento especial', detail: 'Debe seleccionar una categoria', life: 1500 });
                return;
            }

            if (this.paquete.cantidad_ganadores == 0) {
                this.$toast.add({ severity: 'error', summary: 'Nuevo evento especial', detail: 'Debe seleccionar al menos un ganador', life: 1500 });
                return;
            }
            if (this.paquete.criterio_ganador.length == 0) {
                this.$toast.add({ severity: 'error', summary: 'Nuevo evento especial', detail: 'Debe seleccionar al menos un criterio de ganador', life: 1500 });
                return;
            }
            const p = { ...this.paquete };
            p.cantidad_ganadores = parseInt(p.cantidad_ganadores);
            p.fecha_inicio = this.fecha_rango[0];
            p.fecha_fin = this.fecha_rango[1];
            p.criterio_ganador = this.paquete.criterio_ganador.map(criterio => criterio.key);

            await axios.post(`${this.API}/sorpresa/eventoEspecial/crear`, p, {
                headers: {
                    Authorization: `Bearer ${this.store.getToken()}`
                }
            }).then(response => {
                if (response.data.creado) {
                    this.getEvento();
                    this.modalEvento = false;
                }
                this.$toast.add({ severity: response.data.creado ? 'success' : 'error', summary: 'Nuevo evento especial', detail: response.data.message, life: 1500 });
            }).catch(error => {
                switch (error.response.data.statusCode) {
                    case 401:
                        //Se le termino la sesión
                        this.store.clearUser();
                        this.$router.push('/login');
                        break;
                    default:
                        this.$toast.add({ severity: 'error', summary: 'Nuevo evento especial', detail: error.response.data.message, life: 1500 });
                        console.log('Error: ', error);
                        break;
                }
            });

        },
        async getEvento() {
            await axios.get(`${this.API}/sorpresa/evento`, {
            }).then(response => {
                this.Evento = response.data;
                console.log(this.Evento);
            }).catch(error => {
                switch (error.response.data.statusCode) {
                    case 401:
                        //Se le termino la sesión
                        this.store.clearUser();
                        this.$router.push('/login');
                        break;
                    default:
                        console.log('Error: ', error);
                        break;
                }

            });
        },

        async agregarParticipante() {
            let creador = this.store.getUsuario();
            this.paqueteParticipante.evento = this.verificacionAplicar;
            this.paqueteParticipante.participante = this.store.getId();
            this.paqueteParticipante.categoria = this.categoriaEvento;
            this.paqueteParticipante.categoriaParticipante = creador.creator_type;
            console.log(this.paqueteParticipante);
            await axios.put(`${this.API}/sorpresa/agreagarParticipante`, this.paqueteParticipante, {
                headers: {
                    Authorization: `Bearer ${this.store.getToken()}`
                }
            }).then(response => {
                console.log(response);
                this.getEvento();
                this.modalAplicar = false;
                if (response.data == "Participante Inscrito") {
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: response.data, life: 1500 });
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Éxito', detail: response.data, life: 1500 });
                }
            }).catch(error => {
                switch (error.response.data.statusCode) {
                    case 401:
                        //Se le termino la sesión
                        this.store.clearUser();
                        this.$router.push('/login');
                        break;
                    default:
                        console.log('Error: ', error);
                        break;
                }

            });
        },
        async Eliminar() {
            await axios.delete(`${this.API}/sorpresa/evento/${this.verificacionEliminar}`, {
                headers: {
                    Authorization: `Bearer ${this.store.getToken()}`
                }
            }).then(response => {
                console.log(response);
                this.modalEliminar = false;
            }).catch(error => {
                switch (error.response.data.statusCode) {
                    case 401:
                        //Se le termino la sesión
                        this.store.clearUser();
                        this.$router.push('/login');
                        break;
                    default:
                        console.log('Error: ', error);
                        break;
                }

            });
        }

    },

    async created() {
        this.store = useStoreEvento();
        if (this.store.isAdmin()) {
            this.admin = true;
        }
        if (this.store.Evento) {
            this.modalAplicar = true;
            this.verificacionAplicar = this.store.evento.evento;
            this.categoriaEvento = this.store.evento.categoria;
            this.store.eventoDelete();
        }
        await this.getEvento();
    }

}
</script>
<style>
.p-inputnumber-input {
    width: 100% !important;
}
</style>