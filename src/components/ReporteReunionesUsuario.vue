<template>
	<div class="flex flex wrap gap-2 justify-content-center flex-column" v-if="reunionesConfig.activo">
		<div class="flex flex-wrap mx-4 justify-content-center">
			<div class="col-8">
				<Message :closable="false" v-if="reunionesConfig.activo">
					<p class="font-bold m-0 text-2xl">
						Completar las reuniones mínimas {{ miCalendario.reuniones_asistencia.length }} de {{ reunionesConfig.min_reuniones }}, si no
						asiste a reuniones no podrá reclamar su premio.
					</p>
				</Message>
				<div class="reuniones flex flex-wrap gap-2 border-0 border-3 p-3 overflow-auto border-round-lg" style="max-height: 400px">
					<div class="reunion shadow shadow-8 border-round-sm p-2 relative" v-for="(reunion, index) in reunionesActual" :key="index">
						<p class="mt-0">{{ reunion.asunto }}</p>
						<div class="flex flex-wrap justify-content-between absolute bottom-0 align-items-center">
							<Button icon="pi pi-eye" @click="clickFecha(reunion._id)" text rounded aria-label="Ver más" />
							<span class="text-sm border-900 border-1 p-1" style="border-radius: 20px">
								{{ reunion.fecha.slice(0, 10) }} {{ reunion.fecha.slice(11, 16) }}
							</span>
						</div>

						<Button
							icon="pi pi-times"
							size="small"
							severity="danger"
							text
							plain
							rounded
							aria-label="Falló, no reclama"
							class="absolute top-0 right-0"
							v-if="reunion.estado == 'Finalizada' && !asistiAReunion(reunion._id)"
						/>
                        <Button
							icon="pi pi-check"
							size="small"
							severity="success"
							text
							plain
							rounded
							aria-label="Compleado"
							class="absolute top-0 right-0"
							v-else-if="reunion.estado == 'Finalizada' && asistiAReunion(reunion._id)"
						/>
                        <Button
							icon="pi pi-hourglass"
							size="small"
							severity="warning"
							text
							plain
							rounded
							aria-label="Pendiente"
							class="absolute top-0 right-0"
							v-else
						/>
					</div>
				</div>
				<div class="referencia flex flex-wrap mt-3 gap-2">
					<Button
						v-for="(referencia, indexBtn) in referencias"
						:key="indexBtn"
						:icon="referencia.icon"
						size="small"
						:severity="referencia.severity"
						text
						rounded
						:aria-label="referencia.label"
						:label="referencia.label"
					/>
				</div>
			</div>
		</div>
		<Dialog
			v-model:visible="modalDataReunion"
			:header="dataReunion.asunto"
			:style="{ width: '50rem' }"
			:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
			position="center"
			:draggable="false"
			:modal="true"
		>
			<div class="flex w-full flex-wrap flex-column justify content-center gap-4">
				<div class="w-full flex flex-column gap-1">
					<label for="asunto" class="m-0 font-bold">Asunto</label>
					<InputText v-model="dataReunion.asunto" :readonly="true" :disabled="true" id="asunto" placeholder="Asunto de la reunión" />
				</div>
				<div class="w-full flex flex-column gap-1">
					<label for="fecha" class="m-0 font-bold">Fecha</label>
					<Calendar
						id="fecha"
						v-model="dataReunion.fecha"
						:readonly="true"
						:disabled="true"
						:minDate="new Date()"
						showTime
						hourFormat="24"
					/>
				</div>
				<div class="w-full flex flex-column gap-2 mt-2">
					<h2 class="m-0">Asistencia confirmada</h2>
					<DataTable
						:value="dataReunion.asistentes"
						dataKey="usuario"
						:filters="filtersAsistente"
						sortField="usuario"
						:sortOrder="1"
						paginator
						:rows="10"
						:rowsPerPageOptions="[5, 10, 20, 50]"
						class="pt-0"
						paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
						:alwaysShowPaginator="false"
					>
						<template #header>
							<div class="flex flex-column w-full gap-2">
								<span class="p-input-icon-left">
									<i class="pi pi-search" />
									<InputText v-model="filtersAsistente['global'].value" placeholder="Buscar..." />
								</span>
							</div>
						</template>
						<Column field="usuario" header="Creador" />
					</DataTable>
				</div>
			</div>
			<template #footer>
				<Button label="Cerrar" @click="modalDataReunion = false" autofocus text severity="danger" />
			</template>
		</Dialog>
	</div>
</template>
<script>
import axios from "axios";
import { useStoreEvento } from "../store";
import { FilterMatchMode, FilterOperator } from "primevue/api";
export default {
	data: () => ({
		API: import.meta.env.VITE_APP_API,
		store: null,
		headers: {
			headers: { Authorization: null },
		},
		filtersAsistente: {
			global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
		},
		referencias: [
			{ label: "Falló, no reclama", icon: "pi pi-times", severity: "danger" },
			{ label: "Pendiente", icon: "pi pi-hourglass", severity: "warning" },
			{ label: "Completado", icon: "pi pi-check", severity: "success" },
		],
		miCalendario: { reuniones: [], reuniones_asistencia: [] },
		reunionesActual: [],
		reunionesConfig: {
			min_reuniones: 0,
			activo: false,
		},
		dataReunion: { asunto: null, fecha: new Date(), estado: "Pendiente", asistentes: [] },
		modalDataReunion: false,
	}),
	methods: {
		asistiAReunion(reunion = null) {
			if (reunion != null) {
				const r = this.miCalendario.reuniones_asistencia.find((r) => r._id == reunion);
				return r != undefined;
			}
			return false;
		},
		async clickFecha(reunion = null) {
			if (reunion != null) {
				this.$toast.add({
					severity: "info",
					summary: "Reunión",
					detail: "Buscando reunión, espera un momento...",
					life: 1600,
				});
				await axios
					.get(`${this.API}/reunion/${reunion}`, this.headers)
					.then((resp) => {
						if (!resp.data.error) {
							this.dataReunion = { ...resp.data, fecha: new Date(resp.data.fecha) };

							this.modalDataReunion = true;
						} else {
							this.$toast.add({
								severity: "error",
								summary: "Reunión",
								detail: "No se encontró la reunión",
								life: 1600,
							});
						}
					})
					.catch((error) => {
						switch (error.response.data.statusCode) {
							case 400:
								//Bad Request
								this.$toast.add({
									severity: "error",
									summary: "Obtener reunión",
									detail: "Formato de los datos incorrecto",
									life: 1600,
								});
								break;
							case 401:
								//Se le termino la sesión
								this.store.clearUser();
								this.$router.push("/login");
								break;
							default:
								this.$toast.add({
									severity: "error",
									summary: "Obtener reunión",
									detail: "Sucedió un error, comuníquese con soporte",
									life: 1600,
								});
								console.log("Error: ", error);
								break;
						}
					});
			}
		},
		async getMiCalendario() {
			const d = new Date();
			const anio_mes = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
			await axios
				.get(`${this.API}/reunion/usuario/${this.store.getId()}`, this.headers)
				.then((resp) => {
					if (!resp.data.error) {
						this.miCalendario = resp.data;
						this.reunionesActual = this.miCalendario.reuniones.filter((reunion) => reunion.fecha.startsWith(anio_mes));
					}
				})
				.catch((error) => {
					switch (error.response.data.statusCode) {
						case 400:
							//Bad Request
							this.$toast.add({
								severity: "error",
								summary: "Obtener mi calendario",
								detail: "Formato de los datos incorrecto",
								life: 1600,
							});
							break;
						case 401:
							//Se le termino la sesión
							this.store.clearUser();
							this.$router.push("/login");
							break;
						default:
							this.$toast.add({
								severity: "error",
								summary: "Obtener mi calendario",
								detail: "Sucedió un error, comuníquese con soporte",
								life: 1600,
							});
							console.log("Error: ", error);
							break;
					}
				});
		},
		async getConfigReuniones() {
			await axios.get(`${this.API}/reunion/config/actual`, this.headers).then((resp) => {
				if (resp.data != null && resp.data != "") {
					this.reunionesConfig.min_reuniones = resp.data.min_reuniones;
					this.reunionesConfig.activo = resp.data.activo;
				}
			});
		},
	},
	async created() {
		this.store = useStoreEvento();
		this.headers.headers.Authorization = `Bearer ${this.store.getToken()}`;
		await this.getConfigReuniones();
		await this.getMiCalendario();
	},
};
</script>
<style>
.reuniones > .reunion {
	max-width: 200px;
	min-height: 150px;
}
</style>