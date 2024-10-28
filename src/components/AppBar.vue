<template>
	<div class="appBarContainer">
		<Toast />

		<!-- <Sidebar v-model:visible="visible">
			<template #container="{ closeCallback }">
				<div class="flex flex-column h-full">
					<div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
						<span class="inline-flex align-items-center gap-2">
							<svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
									fill="var(--primary-color)"
								/>
								<path
									d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
									fill="var(--text-color)"
								/>
							</svg>
							<span class="font-semibold text-2xl text-primary">Your Logo</span>
						</span>
						<span>
							<Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined class="h-2rem w-2rem"></Button>
						</span>
					</div>
					<div class="overflow-y-auto">
						<ul class="list-none p-3 m-0">
							<li>
								<ul class="list-none p-0 m-0 overflow-hidden">
									<li>
										<a
											v-ripple
											v-styleclass="{
												selector: '@next',
												enterClass: 'hidden',
												enterActiveClass: 'slidedown',
												leaveToClass: 'hidden',
												leaveActiveClass: 'slideup',
											}"
											class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
										>
											<i class="pi pi-chart-line mr-2"></i>
											<span class="font-medium">Reports</span>
											<i class="pi pi-chevron-down ml-auto"></i>
										</a>
										<ul
											class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
										>
											<li>
												<a
													v-ripple
													v-styleclass="{
														selector: '@next',
														enterClass: 'hidden',
														enterActiveClass: 'slidedown',
														leaveToClass: 'hidden',
														leaveActiveClass: 'slideup',
													}"
													class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
												>
													<i class="pi pi-chart-line mr-2"></i>
													<span class="font-medium">Revenue</span>
													<i class="pi pi-chevron-down ml-auto"></i>
												</a>
												<ul
													class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
												>
													<li>
														<a
															v-ripple
															class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
														>
															<i class="pi pi-table mr-2"></i>
															<span class="font-medium">View</span>
														</a>
													</li>
													<li>
														<a
															v-ripple
															class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
														>
															<i class="pi pi-search mr-2"></i>
															<span class="font-medium">Search</span>
														</a>
													</li>
												</ul>
											</li>
											<li>
												<a
													v-ripple
													class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
												>
													<i class="pi pi-chart-line mr-2"></i>
													<span class="font-medium">Expenses</span>
												</a>
											</li>
										</ul>
									</li>
									<li>
										<a
											v-ripple
											class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
										>
											<i class="pi pi-users mr-2"></i>
											<span class="font-medium">Team</span>
										</a>
									</li>
									<li>
										<a
											v-ripple
											class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
										>
											<i class="pi pi-comments mr-2"></i>
											<span class="font-medium">Messages</span>
											<span
												class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle"
												style="min-width: 1.5rem; height: 1.5rem"
											>
												3
											</span>
										</a>
									</li>
									<li>
										<a
											v-ripple
											class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
										>
											<i class="pi pi-calendar mr-2"></i>
											<span class="font-medium">Calendar</span>
										</a>
									</li>
									<li>
										<a
											v-ripple
											class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
										>
											<i class="pi pi-cog mr-2"></i>
											<span class="font-medium">Settings</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>
						<ul class="list-none p-3 m-0">
							<li>
								<div
									v-ripple
									v-styleclass="{
										selector: '@next',
										enterClass: 'hidden',
										enterActiveClass: 'slidedown',
										leaveToClass: 'hidden',
										leaveActiveClass: 'slideup',
									}"
									class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
								>
									<span class="font-medium">APPLICATION</span>
									<i class="pi pi-chevron-down"></i>
								</div>
								<ul class="list-none p-0 m-0 overflow-hidden">
									<li>
										<a
											v-ripple
											class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
										>
											<i class="pi pi-folder mr-2"></i>
											<span class="font-medium">Projects</span>
										</a>
									</li>
									<li>
										<a
											v-ripple
											class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
										>
											<i class="pi pi-chart-bar mr-2"></i>
											<span class="font-medium">Performance</span>
										</a>
									</li>
									<li>
										<a
											v-ripple
											class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
										>
											<i class="pi pi-cog mr-2"></i>
											<span class="font-medium">Settings</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="mt-auto">
						<hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
						<a
							v-ripple
							class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
						>
							<Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
							<span class="font-bold">Amy Elsner</span>
						</a>
					</div>
				</div>
			</template>
		</Sidebar> -->

		<Sidebar v-model:visible="visibleSidebar">
			<Menu :model="itemsMenu" class="w-full">
				<template #submenuheader="{ item }">
					<span class="text-primary-500 dark:text-primary-400 font-bold leading-none">{{ item.label }}</span>
				</template>

				<template #item="{ item, props }">
					<router-link :to="item.route" v-if="!item.children" v-slot="{ href }" custom>
						<a v-ripple :href="href" v-bind="props.action" aria-hidden="false" @click="actionMenu(item.action)">
							<span :class="item.icon" class="mr-2" />
							<span>{{ item.label }}</span>
						</a>
					</router-link>
					<div v-else>
						<a
							v-ripple
							v-styleclass="{
								selector: '@next',
								enterClass: 'hidden',
								enterActiveClass: 'slidedown',
								leaveToClass: 'hidden',
								leaveActiveClass: 'slideup',
							}"
							class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
						>
							<span :class="item.icon" class="mr-2" />
							<span class="font-medium">{{ item.label }}</span>
							<i class="pi pi-chevron-down ml-auto"></i>
						</a>
						<ul class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
							<li v-for="(child, index) in item.children" :key="index">
								<router-link :to="child.route" v-slot="{ href }" custom>
									<a
										v-ripple
										class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
										:href="href"
										v-bind="props.action"
										aria-hidden="false"
										@click="actionMenu(item.action)"
									>
										<span :class="child.icon" class="mr-2" />
										<span class="font-medium">{{ child.label }}</span>
									</a>
								</router-link>
							</li>
						</ul>
					</div>
				</template>
			</Menu>
		</Sidebar>
		<Menubar class="appBar" :model="sinMenu">
			<template #start>
				<div class="flex gap-2 align-items-center">
					<Button icon="pi pi-bars" text size="large" @click="visibleSidebar = true" />
					<a href="/" style="text-decoration: none">
						<span class="text-2xl font-bold logo">
							<span>Samy</span>
							flw
						</span>
					</a>
				</div>
			</template>

			<template #end>
				<div class="flex flex-wrap justify-content-end align-items-center gap-2 info-perfil">
					<Tag v-if="!store.isAdmin()" severity="info" rounded :value="`Créditos: ${creditos}`" />
					<a style="cursor: pointer !important" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
						<Avatar
							v-if="store.isAdmin() || store.getFoto().length == 0"
							icon="pi pi-user"
							class="mr-2"
							shape="circle"
							style="background-color: var(--primary-color); color: #2a1261"
						/>
						<Avatar v-else :image="store.getFoto()" class="mr-2" shape="circle" />
					</a>
					<Menu ref="menu" id="overlay_menu" :model="itemsUsuario" :popup="true" :focusedOptionId="null" :aria-activedescendant="false">
						<template #start>
							<button
								v-ripple
								class="relative overflow-hidden w-full p-link flex items-center p-2 pl-3 text-surface-700 dark:text-surface-0/80 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-none"
							>
								<Avatar v-if="store.isAdmin() || store.getFoto().length == 0" icon="pi pi-user" class="mr-2" shape="circle" />
								<Avatar v-else :image="store.getFoto()" class="mr-2" shape="circle" />

								<span class="inline-flex flex-column justify-start">
									<span class="font-bold">{{ usuarioLog.usuario }}</span>
									<span class="text-sm">{{ usuarioLog.rol }}</span>
								</span>
							</button>
						</template>

						<template #item="{ item, props }">
							<a v-ripple class="flex items-center" @click="actionMenu(item.action)" v-bind="props.action">
								<span :class="item.icon" />
								<span class="ml-2">{{ item.label }}</span>
							</a>
						</template>
					</Menu>
				</div>
			</template>
		</Menubar>
		<dialogMiPerfil :mostrarMiPerfil="mostrarPerfil" @dialogPerfilOculto="mostrarPerfil = false" />
		<dialogEditarPerfil :mostrarEditar="mostrarEditar" @dialogEditarOculto="mostrarEditar = false" @perfilActualizado="getNewDatos" />
		<Insignias v-if="store.isAdmin()" :mostrarInsigniasProp="mostrarInsignias" @dialogOculto="mostrarInsignias = false"></Insignias>
		<Dialog
			v-model:visible="addCreador"
			maximizable
			:header="store.isAdmin() ? 'Credenciales backstage' : 'Agregar creador'"
			:style="{ width: store.isAdmin() ? '34rem' : '45rem' }"
			:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
			position="top"
			:modal="true"
			:draggable="false"
		>
			<div v-if="store.isAdmin()">
				<form ref="formAdd">
					<div class="flex flex-column gap-1 mb-2">
						<label for="correo" class="font-bold block">Correo</label>
						<InputText v-model="paquete.correo" type="email" placeholder="Correo" id="correo" />
					</div>
					<div class="flex flex-column gap-1 mb-2">
						<label for="contrasena" class="font-bold block">Contraseña</label>
						<InputText v-model="paquete.contrasena" type="text" placeholder="Contraseña" id="contrasena" />
					</div>
				</form>
			</div>
			<div v-else>
				<h2 class="m-0">Credenciales backstage</h2>
				<div class="flex flex-column gap-1">
					<label for="correo" class="font-bold block">Correo</label>
					<InputText v-model="paquete.correo" disabled type="email" placeholder="Correo" id="correo" />
				</div>
				<div class="flex flex-column gap-1">
					<label for="contrasena" class="font-bold block">Contraseña</label>
					<InputText v-model="paquete.contrasena" disabled type="text" placeholder="Contraseña" id="contrasena" />
				</div>
				<div class="mt-2 mb-3">
					<h3 class="m-0">Guía</h3>
					<video width="100%" autoplay="false" muted height="300px" controls>
						<source
							src="https://res.cloudinary.com/dq2sbqjgf/video/upload/v1711917204/tutoriales/byfp8ygyo7kdv1ueclwf.mp4"
							type="video/mp4"
						/>
					</video>
				</div>
				<p>Inicia sesión con las credenciales y agrega al creador</p>
				<iframe
					title="TikTok Backstage"
					height="800px"
					width="100%"
					src="https://live-backstage.tiktok.com/login/"
					frameborder="0"
				></iframe>
			</div>
			<template #footer>
				<Button label="Cerrar" @click="addCreador = false" text severity="danger" />
				<div class="flex gap-2" v-if="store.isAdmin()">
					<Button :label="paquete.estado == 'Activado' ? 'Desactivar' : 'Activar'" severity="warning" @click="cambiarEstadoBackstage" />
					<Button label="Agregar" @click="modificarCredenciales" severity="success" />
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script>
import axios from "axios";
import { useStoreEvento } from "../store";
import dialogMiPerfil from "./MiPerfil.vue";
import dialogEditarPerfil from "./EditarPerfil.vue";
import EventoEspecial from "./EventoEspecial.vue";
import Insignias from "./Insignias.vue";
export default {
	props: {
		creditos: {
			type: String,
			default: "0",
		},
	},
	components: {
		dialogMiPerfil,
		dialogEditarPerfil,
		Insignias,
		EventoEspecial,
	},
	data: () => ({
		API: import.meta.env.VITE_APP_API,
		store: null,
		sinMenu: [],
		itemsMenu: [],
		itemsUsuario: [],
		mostrarInsignias: false,
		mostrarPerfil: false,
		mostrarEditar: false,
		usuarioLog: {
			usuario: null,
			rol: null,
			correo: null,
			telefono: null,
		},
		visibleSidebar: false,
		addCreador: false,
		paquete: {
			correo: null,
			contrasena: null,
			estado: "Desactivado",
		},
	}),
	methods: {
		toggle(event) {
			this.$refs.menu.toggle(event);
		},
		actionMenu(action) {
			this.visibleSidebar = false;
			if (action) {
				action = action.toLowerCase();
			}
			switch (action) {
				case "perfil":
					this.mostrarPerfil = true;
					break;

				case "editar_perfil":
					this.mostrarEditar = true;
					break;

				case "cerrar_sesión":
					this.cerrarSesion();
					break;
				case "insignia_abrir":
					this.mostrarInsignias = true;
					break;
				case "add_creador":
					this.addCreador = true;
					break;
			}
		},
		async getDatosUsuario() {
			await axios
				.get(`${this.API}/usuario/${this.store.getId()}`, {
					headers: {
						Authorization: `Bearer ${this.store.getToken()}`,
					},
				})
				.then((response) => {
					this.usuarioLog.usuario = response.data.usuario;
					this.usuarioLog.rol = response.data.rol;
				})
				.catch((error) => {
					switch (error.response.data.statusCode) {
						case 401:
							//Se le termino la sesión
							this.store.clearUser();
							this.$router.push("/login");
							break;
						default:
							this.$toast.add({ severity: "error", summary: "Datos del usuario", detail: "Ocurrió un problema inesperado!", life: 1600 });
							console.log("Error: ", error);
							break;
					}
				});
		},
		async getNewDatos() {
			await axios
				.get(`${this.API}/usuario/${this.store.getId()}`, {
					headers: {
						Authorization: `Bearer ${this.store.getToken()}`,
					},
				})
				.then((response) => {
					this.store.newDatos(response.data);
				})
				.catch((error) => {
					switch (error.response.data.statusCode) {
						case 401:
							//Se le termino la sesión
							this.store.clearUser();
							this.$router.push("/login");
							break;
					}
				});
		},
		async modificarCredenciales() {
			if (this.paquete.correo != null && this.paquete.contrasena != null) {
				const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (isEmail.test(this.paquete.correo)) {
					await axios
						.post(`${this.API}/usuario/credencialesBackstage`, this.paquete, {
							headers: {
								Authorization: `Bearer ${this.store.getToken()}`,
							},
						})
						.then((r) => {
							if (r.data) {
								this.addCreador = false;
							}
							this.$toast.add({
								severity: "success",
								summary: "Credenciales backstage",
								detail: r.data ? "Credenciales actualizadas correctamente" : "No se pudo actualizar las credenciales",
								life: 1600,
							});
						})
						.catch((error) => {
							switch (error.response.data.statusCode) {
								case 401:
									//Se le termino la sesión
									this.store.clearUser();
									this.$router.push("/login");
									break;
								default:
									this.$toast.add({ severity: "error", summary: `Sucedió un problema`, detail: error.response.data.message, life: 1500 });
									console.log("Error: ", error);
									break;
							}
						});
				} else {
					this.$toast.add({ severity: "error", summary: "Credenciales", detail: "Ingresa un correo válido", life: 1600 });
				}
			} else {
				this.$toast.add({ severity: "error", summary: "Credenciales", detail: "Debes llenar todos los campos", life: 1600 });
			}
		},
		async getBackstage() {
			await axios
				.get(`${this.API}/usuario/backstage`, {
					headers: {
						Authorization: `Bearer ${this.store.getToken()}`,
					},
				})
				.then((response) => {
					if (response.data) {
						this.paquete = { ...response.data };
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
							this.$toast.add({ severity: "error", summary: "Backstage", detail: "Sucedió un problema", life: 1600 });
							console.log("Error: ", error);
							break;
					}
				});
		},
		async cambiarEstadoBackstage() {
			this.paquete.estado = this.paquete.estado == "Activado" ? "Desactivado" : "Activado";
			await axios
				.put(
					`${this.API}/usuario/estadoBackstage`,
					{ estado: this.paquete.estado },
					{
						headers: {
							Authorization: `Bearer ${this.store.getToken()}`,
						},
					}
				)
				.then((r) => {
					this.$toast.add({
						severity: "success",
						summary: "Estado backstage",
						detail: r.data ? "Estado cambiado correctamente" : "No se pudo cambiar el estado",
						life: 1600,
					});
				})
				.catch((error) => {
					switch (error.response.data.statusCode) {
						case 401:
							//Se le termino la sesión
							this.store.clearUser();
							this.$router.push("/login");
							break;
						default:
							this.$toast.add({ severity: "error", summary: `Sucedió un problema`, detail: error.response.data.message, life: 1500 });
							console.log("Error: ", error);
							break;
					}
				});
		},
		cerrarSesion() {
			this.store.clearUser();
			this.$router.push("/login");
		},
	},
	async created() {
		this.store = useStoreEvento();
		const admin = this.store.isAdmin();
		await this.getBackstage();
		if (admin) {
			this.itemsMenu = [
				{
					separator: true,
				},
				{
					label: "Creadores",
					items: [
						{
							label: "Gestionar Creador",
							icon: "pi pi-users",
							route: "/panel/creadores",
						},
						{
							label: "Configuración Bonus",
							icon: "pi pi-money-bill",
							route: "/panel/bonus",
						},
						{
							label: "Premios Aleatorios",
							icon: "pi pi-wallet",
							route: "/panel/aleatorios",
						},
						{
							label: "Gestionar Promoción",
							icon: "pi pi-thumbs-up-fill",
							route: "/panel/promocion",
						},
						{
							label: "Regalos",
							icon: "pi pi-gift",
							route: "/panel/regalos",
						},
						{
							label: "Agregar creadores",
							icon: "pi pi-user-plus",
							action: "add_creador",
							route: "#action",
						},
					],
				},
				{
					label: "Eventos",
					items: [
						{
							label: "Gestionar Eventos",
							icon: "pi pi-calendar-plus",
							route: "/panel/evento",
						},
						{
							label: "Eventos Especiales",
							icon: "pi pi-flag-fill",
							route: "/panel/eventoEspecial",
						},
						{
							label: "Vista Previa",
							icon: "pi pi-desktop",
							route: "/evento",
						},
						{
							label: "Batallas",
							icon: "pi pi-calendar-plus",
							route: "/panel/batalla",
						},
					],
				},
				{
					separator: true,
				},
				{
					label: "Tienda",
					items: [
						{
							label: "Deseos",
							icon: "pi pi-gift",
							route: "/panel/deseos",
						},
					],
				},
				{
					separator: true,
				},
				{
					label: "Administración",
					items: [
						{ label: "Proveedores", icon: "pi pi-sitemap", route: "/panel/proveedores" },
						{
							label: "Insignias",
							icon: "pi pi-star",
							action: "insignia_abrir",
							route: "#action",
						},
						{
							label: "Entregar Premios",
							icon: "pi pi-gift",
							route: "/panel/asignar",
						},
						{
							label: "Control de reglas",
							icon: "pi pi-sliders-h",
							route: "/panel/reglas",
						},
						{
							label: "Mi perfil",
							icon: "pi pi-user",
							action: "perfil",
							route: "#action",
						},
						{
							label: "Editar perfil",
							icon: "pi pi-user-edit",
							action: "editar_perfil",
							route: "#action",
						},
						{
							label: "Cerrar sesión",
							icon: "pi pi-sign-out",
							action: "cerrar_sesión",
							route: "#action",
						},
					],
				},
			];
			this.itemsUsuario = [
				{
					label: "Mi perfil",
					icon: "pi pi-user",
					action: "perfil",
				},
				{
					label: "Editar perfil",
					icon: "pi pi-user-edit",
					action: "editar_perfil",
				},
				{
					label: "Cerrar sesión",
					icon: "pi pi-sign-out",
					action: "cerrar_sesión",
				},
			];
		} else {
			//Verificamos el estado del backstage
			this.itemsMenu = [
				{
					separator: true,
				},
				{
					label: "Principal",
					icon: "pi pi-user",
					route: "/panel/bonus",
				},
				{
					label: "Promoción",
					icon: "pi pi-thumbs-up-fill",
					children: [
						{ label: "Crear orden", icon: "pi pi-cart-plus", route: "/panel/ordenar" },
						{ label: "Ordenes", icon: "pi pi-shopping-cart", route: "/panel/ordenes" },
						{ label: "Agregar fondos", icon: "pi pi-money-bill", route: "/panel/agregarfondos" },
					],
				},
				{
					label: "Deseos",
					icon: "pi pi-gift",
					route: "/panel/deseos",
				},
				{
					label: "Evento",
					icon: "pi pi-calendar-plus",
					route: "/evento",
				},
				{
					label: "Eventos Especiales",
					icon: "pi pi-flag-fill",
					route: "/EventoEspecialView",
				},
				{
					label: "Batallas",
					icon: "pi pi-calendar-plus",
					route: "/panel/batalla",
				},
				{
					label: "DuckRacer",
					icon: "pi pi-dollar",
					route: "/duckracer",
				},
				{
					separator: true,
				},
				{
					label: "Administración",
					items: [
						{
							label: "Mi perfil",
							icon: "pi pi-user",
							route: "/panel/bonus",
						},
						{
							label: "Mis premios",
							icon: "pi pi-gift",
							route: "/panel/premio",
						},
						{
							label: "Control de reglas",
							icon: "pi pi-sliders-h",
							route: "/actualizaciones-reglas",
						},
						{
							label: "Editar perfil",
							icon: "pi pi-user-edit",
							action: "editar_perfil",
							route: "#action",
						},
						{
							label: "Cerrar sesión",
							icon: "pi pi-sign-out",
							action: "cerrar_sesión",
							route: "#action",
						},
					],
				},
			];

			if (this.paquete.estado == "Activado") {
				this.itemsMenu.splice(2, 0, {
					label: "Agregar creadores",
					icon: "pi pi-user-plus",
					action: "add_creador",
					route: "#action",
				});
			}

			this.itemsUsuario = [
				{
					label: "Editar perfil",
					icon: "pi pi-user-edit",
					action: "editar_perfil",
				},
				{
					label: "Cerrar sesión",
					icon: "pi pi-sign-out",
					action: "cerrar_sesión",
				},
			];
		}
		this.getDatosUsuario();
	},
};
</script>

<style>
.appBar {
	background-color: #1f2937 !important;
	border-radius: 0 !important;
	border: 0 !important;
	/* padding: 0 200px; */
}
.info-perfil > span.p-tag {
	width: auto !important;
	text-align: center;
}
.opciones {
	padding: 0 50px !important;
}

.p-sidebar-content > div,
.p-sidebar-content > .p-menu.p-component > .p-menu-end > .p-menu.p-component {
	background: none !important;
	border: 0 !important;
	min-width: 100% !important;
	border-radius: 0 !important;
	height: 100% !important;
}

.p-menu .p-submenu-header {
	background: none !important;
}

.p-panel .p-panel-header {
	border-top-left-radius: 0 !important;
	border-top-right-radius: 0 !important;
}

.logo {
	color: #fff;
	font-size: 2em;
	font-weight: 700;
	text-decoration: none;
}

.logo > span {
	color: #84dc16;
}
</style>
