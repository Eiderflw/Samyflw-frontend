<template>
    <Panel class="EventoEspecial">
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
        Evento: [],

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

    },

    async created() {
        this.store = useStoreEvento();
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