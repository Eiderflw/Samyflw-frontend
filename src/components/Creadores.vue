<template>
	<Panel class="creadores">
		<Toast />
		<template #header>
			<div class="flex flex-wrap items-center gap-2 flex-end w-full justify-content-between">
				<h1 class="m-0">Creadores</h1>
				<div class="botones flex gap-2">
					<Button severity="warning" label="Mezclar" icon="pi pi-plus" @click="modalMezclar = true" />
					<Button label="Insignias" icon="pi pi-plus" @click="modalInsignias = true" />
					<Button label="Excel" icon="pi pi-plus" @click="modalExcel = true" />
				</div>
				<InputText v-model="filters['global'].value" placeholder="Buscar...  " />
			</div>
		</template>
		<DataTable
			:value="creadores"
			sortField="diamantes_mes_actual"
			:sortOrder="-1"
			paginator
			:rows="5"
			v-model:filters="filters"
			:rowsPerPageOptions="[5, 10, 20, 50]"
			tableStyle="min-width: 100%"
		>
			<Column field="usuario" header="Usuario" sortable></Column>
			<Column field="grupo" header="Grupo" sortable>
				<template #body="slotProps">
					<Badge v-if="slotProps.data.grupo == 'A'" :value="slotProps.data.grupo" severity="success"></Badge>
					<Badge v-if="slotProps.data.grupo == 'B'" :value="slotProps.data.grupo" severity="info"></Badge>
					<Badge v-if="slotProps.data.grupo == 'C'" :value="slotProps.data.grupo" severity="danger"></Badge>
				</template>
			</Column>
			<Column field="diamantes_mes_actual" header="Diamantes en el mes" sortable />
			<Column field="diamantes_mes_anterior" header="Diamantes del mes anterior" sortable />
			<Column header="⭐">
				<template #body="slotProps">
					<Button
						icon="pi pi-star"
						severity="warning"
						@click="abrirModalInsigniasActualizar(slotProps.data.insignias, slotProps.data._id)"
					/>
				</template>
			</Column>
			<Column header="Estado" field="isConectado">
				<template #body="slotProps">
					<Tag
						:severity="slotProps.data.isConectado ? 'success' : 'danger'"
						:value="`${slotProps.data.isConectado ? 'Conectado' : 'Sin conexión'} ${
							slotProps.data.ultimaConexion.length == 0
								? ''
								: ' | ' + slotProps.data.ultimaConexion.slice(0, 10) + ' ' + slotProps.data.ultimaConexion.slice(11, 19)
						}`"
					/>
				</template>
			</Column>
			<Column header="Restablecer" field="_id">
				<template #body="slotProps">
					<Button icon="pi pi-sync" severity="" @click="ConfirmarCambiarContrasena(slotProps.data._id, slotProps.data.usuario)" />
				</template>
			</Column>
		</DataTable>
		<!-- Modal agregar evento -->
		<Dialog
			v-model:visible="modalExcel"
			header="Subir excel"
			:style="{ width: '50rem' }"
			:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
			position="top"
			:modal="true"
			:draggable="false"
		>
			<form ref="formExcel" enctype="multipart/form-data">
				<div class="flex flex-column gap-1 mb-2">
					<label for="excel" class="font-bold block">Excel</label>
					<InputText
						type="file"
						id="excel"
						accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
						@change="asignarExcel"
						required
						aria-describedby="excel-help"
					/>
					<small id="excel-help">El archivo debe ser .xlsx, .xls.</small>
				</div>
			</form>
			<template #footer>
				<Button label="Cancelar" @click="modalExcel = false" text severity="danger" autofocus />
				<Button label="Subir" @click="subirExcel" :disabled="btnSubirExcel" severity="success" />
			</template>
		</Dialog>
		<!-- Modal de las insignias -->
		<Dialog
			v-model:visible="modalInsignias"
			header="Subir Insignias"
			:style="{ width: '50rem' }"
			:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
			position="top"
			:modal="true"
			:draggable="false"
		>
			<form ref="formInsignias" enctype="multipart/form-data">
				<div class="flex flex-column gap-1 mb-2">
					<label for="excel" class="font-bold block">Insignias</label>
					<InputText type="file" id="insignia" accept="image/*" @change="asignarInsignia" required aria-describedby="excel-help" />
					<small id="excel-help">El archivo debe ser .extensiones de imagenes</small>
					<label for="descripcion" class="font-bold block">Descripción</label>
					<InputText v-model="descripcionInsignia" type="text" id="descripcion" required />
				</div>
			</form>
			<template #footer>
				<Button label="Cancelar" @click="modalInsignias = false" text severity="danger" autofocus />
				<Button label="Subir" @click="subirInsignia" :disabled="btnSubirInsignia" severity="success" />
			</template>
		</Dialog>
		<Dialog
			v-model:visible="modalInsigniasUser"
			header="Actualizar Insignias"
			:style="{ width: '50rem' }"
			:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
			position="top"
			:modal="true"
			:draggable="false"
		>
			<div class="flex gap-6 flex-wrap justify-content-center">
				<div style="width: 120px; height: 200px" v-for="insignia in insignias" :key="insignia.secure_url">
					<div class="relative flex justify-content-center" style="margin-bottom: 10px">
						<img
							width="120px"
							height="120px"
							:src="insignia.secure_url"
							alt="Insignia"
							class="border-round imgInsignias"
							v-tooltip="insignia.descripcion"
						/>
					</div>
					<div class="flex justify-content-center align-items-center">
						<Checkbox v-model="paqueteActualizarInsigniasUsuario.selectedInsignias" :inputId="insignia.secure_url" :value="insignia" />
					</div>
				</div>
			</div>
			<template #footer>
				<Button label="Cancelar" @click="modalInsigniasUser = false" text severity="danger" autofocus />
				<Button label="Actualizar" @click="actualizarInsigniasUser()" :disabled="btnActualizarInsignia" severity="success" />
			</template>
		</Dialog>

		<Dialog
			v-model:visible="modalMezclar"
			header="Mezclar grupos"
			:style="{ width: '30rem' }"
			:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
			position="top"
			:modal="true"
			:draggable="false"
		>
			<form>
				<div class="flex flex-column gap-2">
					<div class="flex flex-wrap gap-3">
						<div class="flex align-items-center">
							<RadioButton v-model="mezcla.grupo1" inputId="grupoA" name="grupo1" value="A" />
							<label for="grupoA" class="ml-2 cursor-pointer">A</label>
						</div>
						<div class="flex align-items-center">
							<RadioButton v-model="mezcla.grupo1" inputId="grupoB" name="grupo1" value="B" />
							<label for="grupoB" class="ml-2 cursor-pointer">B</label>
						</div>
						<div class="flex align-items-center">
							<RadioButton v-model="mezcla.grupo1" inputId="grupoC" name="grupo1" value="C" />
							<label for="grupoC" class="ml-2 cursor-pointer">C</label>
						</div>
					</div>
					<div class="flex flex-wrap gap-3">
						<div class="flex align-items-center" v-if="mezcla.grupo1 != 'A'">
							<RadioButton :disabled="mezcla.grupo1 == null" v-model="mezcla.grupo2" inputId="grupoA2" name="grupo1" value="A" />
							<label for="grupoA2" class="ml-2 cursor-pointer">A</label>
						</div>
						<div class="flex align-items-center" v-if="mezcla.grupo1 != 'B'">
							<RadioButton :disabled="mezcla.grupo1 == null" v-model="mezcla.grupo2" inputId="grupoB2" name="grupo1" value="B" />
							<label for="grupoB2" class="ml-2 cursor-pointer">B</label>
						</div>
						<div class="flex align-items-center" v-if="mezcla.grupo1 != 'C'">
							<RadioButton :disabled="mezcla.grupo1 == null" v-model="mezcla.grupo2" inputId="grupoC2" name="grupo1" value="C" />
							<label for="grupoC2" class="ml-2 cursor-pointer">C</label>
						</div>
					</div>
				</div>
			</form>
			<template #footer>
				<Button label="Cancelar" @click="modalMezclar = false" text severity="danger" autofocus />
				<Button label="Reiniciar" @click="reiniciarMezcla" severity="warning" />
				<Button label="Mezclar" @click="mezclar" severity="success" />
			</template>
		</Dialog>

		<Dialog
			v-model:visible="abrirModalCambiarContrasena"
			header="Restablecer Contraseña"
			:style="{ width: '50rem' }"
			:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
			position="top"
			:modal="true"
			:draggable="false"
		>
			<h3>¿Esta seguro de restablecer la contraseña del usuario {{ ConfirmanrContraserna.usuario }}?</h3>
			<p>La contraseña será el mismo nombre de usuario.</p>
			<template #footer>
				<Button label="No,Cancelar" @click="abrirModalCambiarContrasena = false" text severity="danger" autofocus />
				<Button label="Si,Restablecer" @click="RestablecerContrasena()" severity="success" />
			</template>
		</Dialog>
		<!-- Widget de presencia en tiempo real -->
		<div class="presencia-badge" @click="modalPresencia = true" title="Usuarios en línea ahora">
			<span class="presencia-dot"></span>
			<span class="presencia-count">{{ usuariosActivos.length }}</span>
			<span class="presencia-label">en línea</span>
		</div>

		<!-- Modal historial de presencia -->
		<Dialog
			v-model:visible="modalPresencia"
			header="👥 Usuarios en la plataforma"
			:style="{ width: '52rem' }"
			:breakpoints="{ '1199px': '75vw', '575px': '95vw' }"
			:modal="true"
			:draggable="false"
		>
			<!-- Tabs de fecha -->
			<div class="flex gap-2 mb-3 flex-wrap">
				<Button
					v-for="tab in ['Ahora', 'Hoy', 'Ayer', 'Fecha']"
					:key="tab"
					:label="tab"
					:severity="presenciaTab === tab ? 'primary' : 'secondary'"
					size="small"
					@click="cambiarTabPresencia(tab)"
				/>
				<Calendar
					v-if="presenciaTab === 'Fecha'"
					v-model="presenciaFechaCustom"
					dateFormat="yy-mm-dd"
					placeholder="Selecciona fecha"
					showButtonBar
					@date-select="cargarHistorialFecha"
					style="width: 160px"
				/>
			</div>

			<!-- Tabla usuarios -->
			<DataTable
				:value="presenciaTab === 'Ahora' ? usuariosActivos : historialAccesos"
				:rows="10"
				paginator
				size="small"
				showGridlines
				:rowsPerPageOptions="[10, 25, 50]"
			>
				<Column header="Foto" style="width: 60px">
					<template #body="s">
						<img
							:src="s.data.foto || 'https://via.placeholder.com/36'"
							style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid #e2e8f0"
						/>
					</template>
				</Column>
				<Column field="usuario" header="Usuario" sortable />
				<Column field="rol" header="Rol" sortable />
				<Column header="Entró" sortable>
					<template #body="s">{{ formatFechaPresencia(s.data.fechaLogin) }}</template>
				</Column>
				<Column header="Último ping" v-if="presenciaTab !== 'Ahora'">
					<template #body="s">{{ formatFechaPresencia(s.data.ultimoHeartbeat) }}</template>
				</Column>
				<Column header="Estado" style="width: 90px">
					<template #body="s">
						<span v-if="presenciaTab === 'Ahora' || s.data.activo" style="color:#22c55e;font-weight:600">● En línea</span>
						<span v-else style="color:#94a3b8">○ Ausente</span>
					</template>
				</Column>
			</DataTable>
		</Dialog>
	</Panel>
</template>
<script>
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
import { useStoreEvento, useStoreMezcla, usePresenceStore } from "../store";
export default {
	data: () => ({
		API: import.meta.env.VITE_APP_API,
		store: null,
		modalExcel: false,
		modalMezclar: false,
		storeMezcla: null,
		filters: {
			global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		},
		insignias: [],
		paqueteActualizarInsigniasUsuario: {
			selectedInsignias: [],
			id: null,
		},
		descripcionInsignia: null,
		modalInsignias: false,
		abrirModalCambiarContrasena: false,
		modalInsigniasUser: false,
		btnSubirExcel: false,
		btnSubirInsignia: false,
		btnActualizarInsignia: false,
		ConfirmanrContraserna: {
			id: null,
			usuario: null,
		},
		creadores: [],
		paquete: {
			excel: null,
		},
		paqueteInsignias: {
			insignia: null,
		},
		mezcla: {
			grupo1: null,
			grupo2: null,
		},
		modalPresencia: false,
		historialAccesos: [],
		presenciaTab: "Ahora",
		presenciaFechaCustom: null,
		presenciaInterval: null,
	}),
	computed: {
		usuariosActivos() {
			const presenceStore = usePresenceStore();
			return presenceStore.activos || [];
		},
	},
	methods: {
		asignarExcel(event) {
			this.paquete.excel = event.target.files[0];
		},
		asignarInsignia(event) {
			this.paqueteInsignias.insignia = event.target.files[0];
		},
		async reiniciarMezcla() {
			this.storeMezcla.reiniciarMezcla();
			await axios
				.post(
					`${this.API}/bonus/mezclarGrupos`,
					{ grupos: "" },
					{
						headers: {
							Authorization: `Bearer ${this.store.getToken()}`,
						},
					}
				)
				.then(() => {
					this.$toast.add({
						severity: "success",
						summary: "Reiniciar mezcla",
						detail: "Mezcla reiniciada",
						life: 1500,
					});
				});
			this.mezcla = {
				grupo1: null,
				grupo2: null,
			};
		},
		async mezclar() {
			if (this.mezcla.grupo1 != null && this.mezcla.grupo2 != null) {
				await axios
					.post(
						`${this.API}/bonus/mezclarGrupos`,
						{ grupos: `${this.mezcla.grupo1}-${this.mezcla.grupo2}` },
						{
							headers: {
								Authorization: `Bearer ${this.store.getToken()}`,
							},
						}
					)
					.then(() => {
						this.storeMezcla.saveMezcla(`${this.mezcla.grupo1}-${this.mezcla.grupo2}`);
						this.$toast.add({
							severity: "success",
							summary: "Mezclar grupos",
							detail: "Grupos mezclados",
							life: 1500,
						});
					});
				this.modalMezclar = false;
			} else {
				this.$toast.add({
					severity: "error",
					summary: "Mezclar grupos",
					detail: "Debes seleccionar los 2 grupos",
					life: 1500,
				});
			}
		},
		async cambiarTabPresencia(tab) {
			this.presenciaTab = tab;
			if (tab === 'Ahora') {
				// El widget usa computed -> presenceStore.activos
			} else if (tab === 'Hoy') {
				const hoy = new Date().toISOString().slice(0, 10);
				await this.cargarHistorialPorFecha(hoy);
			} else if (tab === 'Ayer') {
				const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
				await this.cargarHistorialPorFecha(ayer);
			}
		},
		async cargarHistorialFecha() {
			if (!this.presenciaFechaCustom) return;
			const fecha = new Date(this.presenciaFechaCustom).toISOString().slice(0, 10);
			await this.cargarHistorialPorFecha(fecha);
		},
		async cargarHistorialPorFecha(fecha) {
			try {
				const res = await axios.get(`${this.API}/usuario/historial-accesos/${fecha}`, {
					headers: { Authorization: `Bearer ${this.store.getToken()}` }
				});
				this.historialAccesos = res.data;
			} catch (_) {}
		},
		formatFechaPresencia(fecha) {
			if (!fecha) return '-';
			return new Date(fecha).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
		},
		abrirModalInsigniasActualizar(insignias, id) {
			this.paqueteActualizarInsigniasUsuario.selectedInsignias = insignias;
			this.paqueteActualizarInsigniasUsuario.id = id;
			this.modalInsigniasUser = true;
		},
		async actualizarInsigniasUser() {
			this.btnActualizarInsignia = true;
			await axios
				.post(
					`${this.API}/usuario/actualizarInsignias`,
					{
						id: this.paqueteActualizarInsigniasUsuario.id,
						insignias: this.paqueteActualizarInsigniasUsuario.selectedInsignias,
					},
					{
						headers: {
							Authorization: `Bearer ${this.store.getToken()}`,
						},
					}
				)
				.then((response) => {
					if (response.data) {
						this.$toast.add({
							severity: "success",
							summary: "Actualizar insignias",
							detail: "Se actualizo correctamente",
							life: 1500,
						});
					} else {
						this.$toast.add({
							severity: "error",
							summary: "Actualizar insignias",
							detail: "Comuniquese con soporte",
							life: 1500,
						});
					}
					this.getCreadores();
				})
				.catch((error) => {
					switch (error.response.data.statusCode) {
						case 401:
							//Se le termino la sesión
							this.store.clearUser();
							this.$router.push("/login");
							break;
						default:
							this.$toast.add({
								severity: "error",
								summary: "Actualizar insignias",
								detail: "Sucedió un error, Comuniquese con soporte",
								life: 1500,
							});
							console.log("Error: ", error);
							break;
					}
				});
			this.btnActualizarInsignia = false;
			this.modalInsigniasUser = false;
		},
		async subirExcel() {
			this.btnSubirExcel = true;
			if (this.paquete.excel != null) {
				await axios
					.post(`${this.API}/usuario/subirExcel`, this.paquete, {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${this.store.getToken()}`,
						},
					})
					.then((response) => {
						if (response.data.procesado) {
							this.getCreadores();
							this.modalExcel = false;
							this.$refs.formExcel.reset();
							this.$toast.add({
								severity: "success",
								summary: "Subir excel",
								detail: response.data.message,
								life: 1500,
							});
						} else {
							this.$toast.add({
								severity: "error",
								summary: "Subir excel",
								detail: response.data.message,
								life: 1500,
							});
						}
					})
					.catch((error) => {
						switch (error.response.data.statusCode) {
							case 401:
								//Se le termino la sesión
								this.store.clearUser();
								this.$router.push("/login");
								break;
							default:
								this.$toast.add({
									severity: "error",
									summary: "Subir excel",
									detail: "Sucedió un error, no se pudo procesar el archivo",
									life: 1500,
								});
								console.log("Error: ", error);
								break;
						}
					});
			} else {
				this.$toast.add({
					severity: "info",
					summary: "Subir excel",
					detail: "Debes escoger un archivo",
					life: 1500,
				});
			}

			this.btnSubirExcel = false;
			console.log("valido");
		},
		async subirInsignia() {
			this.btnSubirInsignia = true;
			if (this.paqueteInsignias.insignia) {
				await axios
					.post(`${this.API}/usuario/subirInsignia/${this.descripcionInsignia ? this.descripcionInsignia : ""}`, this.paqueteInsignias, {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${this.store.getToken()}`,
						},
					})
					.then(async (response) => {
						if (response.data) {
							await this.getInsignias();
							this.modalInsignias = false;
							this.$refs.formInsignias.reset();
							this.descripcionInsignia = null;
							this.$toast.add({
								severity: "success",
								summary: "Subir insignias",
								detail: response.data.message,
								life: 1500,
							});
						} else {
							this.$toast.add({
								severity: "error",
								summary: "Subir insignias",
								detail: response.data.message,
								life: 1500,
							});
						}
					})
					.catch((error) => {
						switch (error.response.data.statusCode) {
							case 401:
								//Se le termino la sesión
								this.store.clearUser();
								this.$router.push("/login");
								break;
							default:
								this.$toast.add({
									severity: "error",
									summary: "Subir insignias",
									detail: "Sucedió un error, no se pudo procesar el archivo",
									life: 1500,
								});
								console.log("Error: ", error);
								break;
						}
					});
			} else {
				this.$toast.add({
					severity: "info",
					summary: "Subir insignias",
					detail: "Debes escoger un archivo",
					life: 1500,
				});
			}

			this.btnSubirInsignia = false;
			console.log("valido");
		},
		async getCreadores() {
			await axios
				.get(`${this.API}/usuario`, {
					headers: {
						Authorization: `Bearer ${this.store.getToken()}`,
					},
				})
				.then((response) => {
					this.creadores = response.data;
				})
				.catch((error) => {
					switch (error.response.data.statusCode) {
						case 401:
							//Se le termino la sesión
							this.store.clearUser();
							this.$router.push("/login");
							break;
						default:
							console.log("Error: ", error);
							break;
					}
				});
		},
		async getInsignias() {
			axios
				.get(`${this.API}/usuario/insigniasCloud`, {
					headers: {
						Authorization: `Bearer ${this.store.getToken()}`,
					},
				})
				.then((resp) => {
					this.insignias = resp.data;
				});
		},
		ConfirmarCambiarContrasena(id, usuario) {
			this.abrirModalCambiarContrasena = true;
			this.ConfirmanrContraserna.id = id;
			this.ConfirmanrContraserna.usuario = usuario;
		},
		async RestablecerContrasena() {
			await axios
				.put(`${this.API}/usuario/UpdatePassword`, this.ConfirmanrContraserna, {
					headers: {
						Authorization: `Bearer ${this.store.getToken()}`,
					},
				})
				.then((resp) => {
					console.log(resp);
					this.abrirModalCambiarContrasena = false;
					this.$toast.add({
						severity: "success",
						summary: "Cambio Exitoso",
						detail: "Contraseña Cambiada",
						life: 1500,
					});
				})
				.catch((error) => {
					this.$toast.add({
						severity: "Error",
						summary: "Error ",
						detail: "Contraseña no se pudo cambiar",
						life: 1500,
					});
				});
		},
	},
	async created() {
		this.store = useStoreEvento();
		this.storeMezcla = useStoreMezcla();
		if (!this.store.isActive()) {
			this.$router.push("/login");
		}
		await axios
			.get(`${this.API}/bonus/gruposMezclados`, {
				headers: {
					Authorization: `Bearer ${this.store.getToken()}`,
				},
			})
			.then((response) => {
				if (response.data != "" && response.data != null) {
					this.storeMezcla.saveMezcla(response.data.grupos);
				}
			});
		const grupos = this.storeMezcla.getGrupo();
		if (grupos) {
			const sep = grupos.split("-");
			this.mezcla.grupo1 = sep[0];
			this.mezcla.grupo2 = sep[1];
		}
		await this.getCreadores();
		await this.getInsignias();
		
		this.presenciaInterval = setInterval(() => {
			if (this.modalPresencia && this.presenciaTab !== 'Ahora') {
				if (this.presenciaTab === 'Hoy') {
					this.cargarHistorialPorFecha(new Date().toISOString().slice(0, 10));
				} else if (this.presenciaTab === 'Ayer') {
					this.cargarHistorialPorFecha(new Date(Date.now() - 86400000).toISOString().slice(0, 10));
				} else if (this.presenciaTab === 'Fecha' && this.presenciaFechaCustom) {
					this.cargarHistorialPorFecha(new Date(this.presenciaFechaCustom).toISOString().slice(0, 10));
				}
			}
		}, 10000);
	},
	beforeUnmount() {
		if (this.presenciaInterval) { clearInterval(this.presenciaInterval); this.presenciaInterval = null; }
	},
};
</script>
<style scoped>
.presencia-badge {
	position: fixed;
	bottom: 18px;
	left: 18px;
	display: flex;
	align-items: center;
	gap: 7px;
	background: #0f172a;
	color: #f1f5f9;
	padding: 8px 16px;
	border-radius: 999px;
	cursor: pointer;
	z-index: 1000;
	box-shadow: 0 4px 20px rgba(0,0,0,0.3);
	font-size: 13px;
	font-weight: 600;
	transition: transform 0.15s, box-shadow 0.15s;
}
.presencia-badge:hover {
	transform: scale(1.05);
	box-shadow: 0 6px 24px rgba(0,0,0,0.4);
}
.presencia-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #22c55e;
	animation: pulse-verde 1.5s infinite;
	flex-shrink: 0;
}
.presencia-count {
	font-size: 16px;
	font-weight: 700;
	color: #22c55e;
}
@keyframes pulse-verde {
	0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
	50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
}
</style>
