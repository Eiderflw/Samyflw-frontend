<template>
	<div class="home">
		<NavBar />
		<div class="inicio">
			<div class="fondo">
				<div class="destacado" id="destacado">
					<video src="/assets/video/home/fondo_leones.mp4" autoplay loop muted>
						<source src="/assets/video/home/fondo_leones.mp4" type="video/mp4" />
						Tu navegador no soporta esta funcionalidad video
					</video>
					<div class="diamantes w-max">
						<div class="title">
							<div class="animacion" />
						</div>
						<div class="flex w-full flex-wrap gap-1 justify-content-center align-items-center">
							<img src="/assets/img/home/diamante.gif" alt="Diamantes" style="width: 40px; object-fit: fill" />
							<p class="m-0 text-2xl text-center font-bold">{{ top3[0].diamantes_mes_actual.toLocaleString() }}</p>
						</div>
					</div>
					<div class="top">
						<img class="fondo" src="/assets/img/home/marco-foto.png" alt="Marco foto" />
						<img :src="top3[0].foto" alt="Top 1" class="top_destacado" />
						<p class="m-0 username">{{ top3[0].usuario }}</p>
					</div>
					<div class="categoria w-max flex flex-column flex-wrap gap-1 justify-content-center align-items-center">
						<h2 class="m-0 white-space-nowrap overflow-hidden text-overflow-ellipsis w-full text-center">CATEGORIA</h2>
						<div class="rookie" v-if="top3[0].categoria == 'Rookie'">
							<div class="animacion" />
						</div>
						<div class="veteran" v-else-if="top3[0].categoria == 'Veteran'">
							<div class="animacion" />
						</div>
						<div class="pro" v-else-if="top3[0].categoria == 'Pro'">
							<div class="animacion" />
						</div>
						<div class="proplus" v-else-if="top3[0].categoria == 'Pro+'">
							<div class="animacion" />
						</div>
					</div>
				</div>
				<section class="top-creadores flex flex-wrap mt-8 gap-2 justify-content-center">
					<div class="top-seleccionado">
						<div class="flex flex-column gap-1">
							<h2 class="m-0 uppercase text-center">Top Seleccionado</h2>
							<DataTable :value="topSeleccionado" unstyled tableStyle="min-width: 100%">
								<Column field="usuario">
									<template #body="slotProps">
										{{ `${(slotProps.index + 1).toString().padStart(2, "0")} -  ${slotProps.data.usuario}` }}
									</template>
								</Column>
								<Column>
									<template #body="props">
										<Avatar :image="props.data.foto" size="large" class="avatar-tabla" shape="circle" />
									</template>
								</Column>
								<Column field="diamantes_mes_actual">
									<template #body="props">
										<div class="flex flex-wrap gap-1 justify-content-center align-items-center">
											<Avatar image="/assets/img/home/diamante.gif" class="avatar-tabla" size="large" />
											<strong>{{ props.data.diamantes_mes_actual.toLocaleString() }}</strong>
										</div>
									</template>
								</Column>
							</DataTable>
						</div>
					</div>
					<div class="top-agencias">
						<div class="flex flex-column gap-1">
							<h2 class="m-0 uppercase text-center">Top Aliados</h2>
							<DataTable :value="topAliados" unstyled tableStyle="min-width: 100%; max-height: 90%;">
								<Column field="usuario">
									<template #body="slotProps">
										{{ `${(slotProps.index + 1).toString().padStart(2, "0")} -  ${slotProps.data.usuario}` }}
									</template>
								</Column>
								<Column>
									<template #body="props">
										<Avatar :image="props.data.foto" class="avatar-tabla" size="large" shape="circle" />
									</template>
								</Column>
								<Column field="diamantes_mes_actual">
									<template #body="props">
										<div class="flex flex-wrap gap-1 justify-content-center align-items-center">
											<Avatar image="/assets/img/home/diamante.gif" class="avatar-tabla" size="large" />
											<strong>{{ props.data.diamantes_mes_actual.toLocaleString() }}</strong>
										</div>
									</template>
								</Column>
							</DataTable>
						</div>
					</div>
				</section>
				<section id="hero">
					<div class="hero-container">
						<h1 class="mb-4 pb-0 animation-duration-1000">
							Samyflw
							<br />
							Agencia
							<span>TikTok</span>
						</h1>
						<p class="mb-4 pb-0 animation-duration-1000">
							Somos una agencia dedicada a crecer tu perfil y en ti mism@.
							<br />
							Ven y se parte
						</p>
						<a href="https://api.whatsapp.com/send?phone=573176205370" target="_blank" class="about-btn animation-duration-1000">
							Whatsapp
						</a>
					</div>
				</section>
				<section id="novedades">
					<div class="containerC pb-5 flex-column align-items-center">
						<h1 class="mb-0">Novedades</h1>
						<Carousel
							:value="novedades"
							:circular="true"
							:showNavigators="false"
							:autoplayInterval="1800"
							:numVisible="3"
							class="w-11"
							:responsiveOptions="responsiveOptions"
						>
							<template #item="props">
								<div
									class="card border-0 surface-hover border-round shadow-4 border-round m-2 p-3 flex flex-column align-items-end text-black"
									style="max-width: 400px; max-height: 350px"
								>
									<div class="header flex justify-content-between w-full align-items-center">
										<h1>{{ props.data.titulo }}</h1>
										<Tag :severity="props.data.tipo == 'Regla' ? 'warning' : 'info'" rounded :value="props.data.tipo" />
									</div>
									<div class="w-full overflow-auto mb-2 descripcion" style="word-break: break-word">
										<p v-html="props.data.descripcion" />
									</div>
									<div class="fecha">
										<p class="m-0">{{ props.data.fecha.slice(0, 10) }}</p>
									</div>
								</div>
							</template>
						</Carousel>
					</div>
				</section>
				<Phone />
				<!-- <Informacion /> -->
				<!-- <section id="clasificados">
					<div>
						<Panel :unstyled="true">
							<template #header>
								<div class="containerC" style="margin-bottom: 20px">
									<Clasificacion :nombre="clasificados[1].usuario" top="2" tipo="Platino" :foto="clasificados[1].foto" />
									<Clasificacion top="1" tipo="Oro" :nombre="clasificados[0].usuario" :foto="clasificados[0].foto" />
									<Clasificacion :nombre="clasificados[2].usuario" top="3" tipo="Cobre" :foto="clasificados[2].foto" />
								</div>
							</template>
							<div style="display: flex; align-items: center; justify-content: center; width: 100%; gap: 1rem">
								<h2>Creadores Destacados</h2>
								<a href="https://www.tiktok.com/@samyflw">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										version="1.1"
										width="50"
										height="50"
										viewBox="0 0 256 256"
										xml:space="preserve"
									>
										<defs></defs>
										<g
											style="
												stroke: none;
												stroke-width: 0;
												stroke-dasharray: none;
												stroke-linecap: butt;
												stroke-linejoin: miter;
												stroke-miterlimit: 10;
												fill: none;
												fill-rule: nonzero;
												opacity: 1;
											"
											transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
										>
											<path
												d="M 36.203 35.438 v -3.51 c -1.218 -0.173 -2.447 -0.262 -3.677 -0.268 c -15.047 0 -27.289 12.244 -27.289 27.291 c 0 9.23 4.613 17.401 11.65 22.342 c -4.712 -5.039 -7.332 -11.681 -7.328 -18.58 C 9.559 47.88 21.453 35.784 36.203 35.438"
												style="
													stroke: none;
													stroke-width: 1;
													stroke-dasharray: none;
													stroke-linecap: butt;
													stroke-linejoin: miter;
													stroke-miterlimit: 10;
													fill: rgb(0, 242, 234);
													fill-rule: nonzero;
													opacity: 1;
												"
												transform=" matrix(1 0 0 1 0 0) "
												stroke-linecap="round"
											/>
											<path
												d="M 36.847 75.175 c 6.714 0 12.19 -5.341 12.44 -11.997 l 0.023 -59.417 h 10.855 c -0.232 -1.241 -0.349 -2.5 -0.35 -3.762 H 44.989 l -0.025 59.419 c -0.247 6.654 -5.726 11.993 -12.438 11.993 c -2.015 0.001 -4 -0.49 -5.782 -1.431 C 29.079 73.238 32.839 75.171 36.847 75.175 M 80.441 23.93 v -3.302 c -3.989 0.004 -7.893 -1.157 -11.232 -3.339 c 2.928 3.371 6.869 5.701 11.234 6.641"
												style="
													stroke: none;
													stroke-width: 1;
													stroke-dasharray: none;
													stroke-linecap: butt;
													stroke-linejoin: miter;
													stroke-miterlimit: 10;
													fill: rgb(0, 242, 234);
													fill-rule: nonzero;
													opacity: 1;
												"
												transform=" matrix(1 0 0 1 0 0) "
												stroke-linecap="round"
											/>
											<path
												d="M 69.209 17.286 c -3.272 -3.744 -5.075 -8.549 -5.073 -13.522 h -3.972 C 61.203 9.318 64.472 14.205 69.209 17.286 M 32.526 46.486 c -6.88 0.008 -12.455 5.583 -12.463 12.463 c 0.004 4.632 2.576 8.88 6.679 11.032 c -1.533 -2.114 -2.358 -4.657 -2.358 -7.268 c 0.007 -6.88 5.582 -12.457 12.463 -12.465 c 1.284 0 2.515 0.212 3.677 0.577 V 35.689 c -1.218 -0.173 -2.447 -0.262 -3.677 -0.268 c -0.216 0 -0.429 0.012 -0.643 0.016 v 11.626 C 35.014 46.685 33.774 46.49 32.526 46.486"
												style="
													stroke: none;
													stroke-width: 1;
													stroke-dasharray: none;
													stroke-linecap: butt;
													stroke-linejoin: miter;
													stroke-miterlimit: 10;
													fill: rgb(255, 0, 79);
													fill-rule: nonzero;
													opacity: 1;
												"
												transform=" matrix(1 0 0 1 0 0) "
												stroke-linecap="round"
											/>
											<path
												d="M 80.441 23.93 v 11.523 c -7.689 0 -14.81 -2.459 -20.627 -6.633 v 30.13 c 0 15.047 -12.24 27.289 -27.287 27.289 c -5.815 0 -11.207 -1.835 -15.639 -4.947 c 5.151 5.555 12.384 8.711 19.959 8.709 c 15.047 0 27.289 -12.242 27.289 -27.287 v -30.13 c 6.009 4.321 13.226 6.642 20.627 6.633 V 24.387 c -1.484 0 -2.927 -0.161 -4.323 -0.46"
												style="
													stroke: none;
													stroke-width: 1;
													stroke-dasharray: none;
													stroke-linecap: butt;
													stroke-linejoin: miter;
													stroke-miterlimit: 10;
													fill: rgb(255, 0, 79);
													fill-rule: nonzero;
													opacity: 1;
												"
												transform=" matrix(1 0 0 1 0 0) "
												stroke-linecap="round"
											/>
											<path
												d="M 59.813 58.949 v -30.13 c 6.009 4.322 13.226 6.642 20.627 6.633 V 23.93 c -4.364 -0.941 -8.305 -3.272 -11.232 -6.644 c -4.737 -3.081 -8.006 -7.968 -9.045 -13.522 H 49.309 l -0.023 59.417 c -0.249 6.654 -5.726 11.995 -12.44 11.995 c -4.007 -0.004 -7.768 -1.938 -10.102 -5.194 c -4.103 -2.151 -6.676 -6.399 -6.681 -11.032 c 0.008 -6.88 5.583 -12.455 12.463 -12.463 c 1.282 0 2.513 0.21 3.677 0.577 V 35.438 C 21.453 35.784 9.559 47.88 9.559 62.713 c 0 7.173 2.787 13.703 7.328 18.58 c 4.578 3.223 10.041 4.95 15.639 4.945 C 47.574 86.238 59.813 73.996 59.813 58.949"
												style="
													stroke: none;
													stroke-width: 1;
													stroke-dasharray: none;
													stroke-linecap: butt;
													stroke-linejoin: miter;
													stroke-miterlimit: 10;
													fill: rgb(0, 0, 0);
													fill-rule: nonzero;
													opacity: 1;
												"
												transform=" matrix(1 0 0 1 0 0) "
												stroke-linecap="round"
											/>
										</g>
									</svg>
								</a>
							</div>
							<DataTable :value="clasificados" tableStyle="min-width: 100%">
								<Column field="usuario" header="Creador Destacado">
									<template #body="slotProps">
										{{ `${slotProps.index + 1} - ${slotProps.data.usuario}` }}
									</template>
								</Column>
								<Column header="Insignias Obtenidas ⭐">
									<template #body="slotProps">
										<div class="misInsignias flex w-full gap-1 flex-wrap justify-content-start">
											<Avatar
												v-for="(insignia, index) in slotProps.data.insignias"
												:key="index"
												size="large"
												shape="circle"
												v-tooltip="insignia.descripcion"
											>
												<img :src="insignia.secure_url" :alt="`Insignia ${index + 1}`" />
											</Avatar>
										</div>
									</template>
								</Column>
								<Column field="grupo" header="Grupo">
									<template #body="slotProps">
										<Badge v-if="slotProps.data.grupo == 'A'" :value="slotProps.data.grupo" severity="success"></Badge>
										<Badge v-if="slotProps.data.grupo == 'B'" :value="slotProps.data.grupo" severity="info"></Badge>
										<Badge v-if="slotProps.data.grupo == 'C'" :value="slotProps.data.grupo" severity="danger"></Badge>
									</template>
								</Column>
							</DataTable>
						</Panel>
					</div>
					<div class="flex w-full"></div>
				</section> -->
			</div>
		</div>
		<Footer id="footer" />
	</div>
</template>
<script>
import axios from "axios";

export default {
	data: () => ({
		API: import.meta.env.VITE_APP_API,
		clasificados: [
			{
				usuario: "x",
				foto: "",
			},
			{
				usuario: "x",
				foto: "",
			},
			{
				usuario: "x",
				foto: "",
			},
		],
		responsiveOptions: [
			{
				breakpoint: "1400px",
				numVisible: 2,
				numScroll: 1,
			},
			{
				breakpoint: "1199px",
				numVisible: 3,
				numScroll: 1,
			},
			{
				breakpoint: "767px",
				numVisible: 2,
				numScroll: 1,
			},
			{
				breakpoint: "575px",
				numVisible: 1,
				numScroll: 1,
			},
		],
		novedades: [],
		topAgencias: [],
		topSeleccionado: [],
		topAliados: [],
		top3: [
			{
				usuario: "x",
				foto: "/assets/img/perfil1.jpg",
				categoria: "",
				diamantes_mes_actual: 0,
				grupo: "",
			},
			{
				usuario: "x",
				foto: "",
				categoria: "",
				diamantes_mes_actual: 0,
				grupo: "",
			},
			{
				usuario: "x",
				foto: "",
				categoria: "",
				diamantes_mes_actual: 0,
				grupo: "",
			},
		],
	}),
	async created() {
		await axios.get(`${this.API}/usuario/top`).then((resp) => {
			if (resp.data.length > 0) {
				const usuarios = resp.data.flatMap((grupo) => grupo.usuarios);
				usuarios.sort((a, b) => b.diamantes_mes_actual - a.diamantes_mes_actual);

				//this.top3[0].foto = usuarios[0].foto;
				this.top3[0].usuario = usuarios[0].usuario;
				this.top3[0].categoria = "Veteran"; //usuarios[0].creator_type;
				this.top3[0].diamantes_mes_actual = usuarios[0].diamantes_mes_actual;
				this.top3[0].grupo = usuarios[0].grupo;

				this.top3[1].foto = usuarios[1].foto;
				this.top3[1].usuario = usuarios[1].usuario;
				this.top3[1].categoria = usuarios[1].creator_type;
				this.top3[1].diamantes_mes_actual = usuarios[1].diamantes_mes_actual;
				this.top3[1].grupo = usuarios[1].grupo;

				this.top3[2].foto = usuarios[2].foto;
				this.top3[2].usuario = usuarios[2].usuario;
				this.top3[2].categoria = usuarios[2].creator_type;
				this.top3[2].diamantes_mes_actual = usuarios[2].diamantes_mes_actual;
				this.top3[2].grupo = usuarios[2].grupo;
			}
		});

		await axios.get(`${this.API}/top-seleccionado`).then((r) => {
			this.topSeleccionado = r.data.length == 1 ? r.data[0].seleccionado : [];
		});
		await axios.get(`${this.API}/usuario/agencias/top10`).then((r) => {
			this.topAliados = r.data;
		});
		await axios.get(`${this.API}/regla-actualizacion/nuevas`).then((resp) => {
			this.novedades = resp.data;
		});
		await axios.get(`${this.API}/usuario/homeCreadores`).then((resp) => {
			this.clasificados = resp.data;
		});

		await axios.get(`${this.API}/usuario/agencias/top10`).then((resp) => {
			this.topAgencias = resp.data;
		});
	},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Raleway&display=swap");
@import url("https://fonts.googleapis.com/css?family=Playfair+Display:400,900");

body,
html {
	margin: 0;
	padding: 0;
	min-height: 100vh;
	background: #000000;
	box-sizing: border-box;
	scroll-behavior: smooth !important;
}

.home {
	background: #000000;
}

#clasificados {
	background: #18c499;
	opacity: 0.8;
	background: -webkit-linear-gradient(to right, #18c499, #d8f05e);
	background: linear-gradient(to right, #18c499, #d8f05e);
}
.destacado {
	width: 100%;
	height: max-content;
	max-height: 650px;
}
.destacado > * {
	width: 100%;
	height: 100%;
	object-fit: contain;
	object-position: top;
}
.destacado > .diamantes > .title {
	background-image: url("/assets/img/home/diamantes-title.png");
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100% 100%;
	object-fit: contain;
	height: 54px;
	width: 340px;
	margin: 0;
}
.destacado > .diamantes > .title > .animacion,
.destacado > .categoria > div > .animacion {
	height: 100%;
	width: 100%;
	background: url("/assets/img/home/electricidad.gif");
	background-size: 100% 100%;
	object-fit: contain;
	mix-blend-mode: lighten;
	background-repeat: no-repeat;
}
.destacado > .diamantes {
	position: absolute;
	left: calc(50% - 507px);
	top: 222px;
	height: auto;
}
.destacado > .categoria {
	position: absolute;
	text-align: center;
	left: calc(50% + 153px);
	top: 208px;
	height: auto;
}

.destacado > .categoria > div {
	pointer-events: none;
	background-repeat: no-repeat;
	background-position: top;
	background-size: 100% 100%;
	object-fit: contain;
	height: 54px;
	width: 340px;
	margin: 0;
}
.destacado > .categoria > .rookie {
	background-image: url("/assets/img/grupos/rookie.png");
}
.destacado > .categoria > .veteran {
	background-image: url("/assets/img/grupos/veterano.png");
}
.destacado > .categoria > .pro {
	background-image: url("/assets/img/grupos/pro.png");
}
.destacado > .categoria > .proplus {
	background-image: url("/assets/img/grupos/pro+.png");
}
.destacado > video {
	min-height: 540px;
	height: auto;
	object-fit: cover;
	max-height: 650px;
}
.destacado > .top {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 137px;
}
.destacado > .top > img.fondo {
	width: 80%;
	max-width: 1041px;
	object-fit: contain;
	background-size: contain;
	background-repeat: no-repeat;
}
.destacado > .top > img.top_destacado {
	position: absolute;
	border-radius: 50%;
	top: 95px;
	left: calc(50% - 92px);
	width: 181px;
	height: 181px;
}
.destacado > .top > .username {
	position: absolute;
	text-align: center;
	width: 208px;
	font-weight: bold;
	font-size: 24px;
	max-width: 208px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	bottom: -76px;
	left: calc(50% - 94px);
}
.destacado > .categoria > h2 {
	line-height: 0.85;
}

#hero {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	position: relative;
}

@media (min-width: 1024px) {
	#hero {
		background-attachment: fixed;
	}
}

#hero:before {
	content: "";
	position: absolute;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
}

#hero .hero-container {
	position: absolute;
	bottom: 0;
	left: 0;
	top: 90px;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;
	padding: 0 15px;
}

@media (max-width: 991px) {
	#hero .hero-container {
		top: 70px;
	}
}

#hero h1 {
	color: #fff;
	font-family: "Raleway", sans-serif;
	font-size: 56px;
	font-weight: 600;
	text-transform: uppercase;
}

#hero h1 span {
	color: #84dc16;
}

@media (max-width: 991px) {
	#hero h1 {
		font-size: 34px;
	}
}

#hero p {
	color: #ebebeb;
	font-weight: 700;
	font-size: 20px;
}

@media (max-width: 991px) {
	#hero p {
		font-size: 16px;
	}
}

#hero .about-btn {
	font-family: "Raleway", sans-serif;
	font-weight: 500;
	font-size: 14px;
	letter-spacing: 1px;
	display: inline-block;
	padding: 12px 32px;
	border-radius: 50px;
	transition: 0.5s;
	line-height: 1;
	margin: 10px;
	color: #fff;
	animation-delay: 0.8s;
	border: 2px solid #84dc16;
	text-decoration: none;
}

#hero .about-btn:hover {
	background: #84dc16;
	color: #fff;
}

@keyframes pulsate-btn {
	0% {
		transform: scale(0.6, 0.6);
		opacity: 1;
	}

	100% {
		transform: scale(1, 1);
		opacity: 0;
	}
}

#about {
	background: url("../img/about-bg.jpg");
	background-size: cover;
	overflow: hidden;
	position: relative;
	color: #fff;
	padding: 60px 0 40px 0;
}

@media (min-width: 1024px) {
	#about {
		background-attachment: fixed;
	}
}

#about:before {
	content: "";
	background: rgba(13, 20, 41, 0.8);
	position: absolute;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
}

#about h2 {
	font-size: 36px;
	font-weight: bold;
	margin-bottom: 10px;
	color: #fff;
}

#about h3 {
	font-size: 18px;
	font-weight: bold;
	text-transform: uppercase;
	margin-bottom: 10px;
	color: #fff;
}

#about p {
	font-size: 14px;
	margin-bottom: 20px;
	color: #fff;
}

.container {
	--bs-gutter-x: 1.5rem;
	--bs-gutter-y: 0;
	width: 100%;
	padding-right: calc(var(--bs-gutter-x) * 0.5);
	padding-left: calc(var(--bs-gutter-x) * 0.5);
	margin-right: auto;
	margin-left: auto;
}

.position-relative {
	position: relative !important;
}

.row {
	--bs-gutter-x: 1.5rem;
	--bs-gutter-y: 0;
	display: flex;
	flex-wrap: wrap;
	margin-top: calc(-1 * var(--bs-gutter-y));
	margin-right: calc(-0.5 * var(--bs-gutter-x));
	margin-left: calc(-0.5 * var(--bs-gutter-x));
}

.row > * {
	flex-shrink: 0;
	width: 100%;
	max-width: 100%;
	padding-right: calc(var(--bs-gutter-x) * 0.5);
	padding-left: calc(var(--bs-gutter-x) * 0.5);
	margin-top: var(--bs-gutter-y);
}

@media (min-width: 992px) {
	.col-lg-6 {
		flex: 0 0 auto;
		width: 50%;
	}

	.col-lg-3 {
		flex: 0 0 auto;
		width: 25%;
	}
}

.fecha {
	background: transparent !important;
	border: 2px solid white;
	text-wrap: nowrap;
	width: max-content;
	border-radius: 50px;
	padding: 4px 8px;
}
</style>
<style>
body,
html {
	scroll-behavior: smooth !important;
}
.descripcion::-webkit-scrollbar {
	width: 8px;
}
.descripcion::-webkit-scrollbar-track {
	background: #555;
	border-radius: 10px;
	cursor: pointer;
}
.descripcion::-webkit-scrollbar-thumb {
	background: #5e951c;
	border-radius: 10px;
	cursor: pointer;
}
.descripcion::-webkit-scrollbar-thumb:hover {
	background: #84dc09;
}
.top-creadores {
	aspect-ratio: 16/9;
}
.top-creadores > .top-seleccionado,
.top-creadores > .top-agencias {
	background-image: url("/assets/img/home/top/fondo.png");
	background-repeat: no-repeat;
	background-size: 100% 100%;
	padding: 48px 60px;
	width: 560px;
	height: auto;
	max-height: 821px;
}

@media (max-width: 1263px) {
	.destacado > .top > img.top_destacado {
		width: 178px !important;
		height: 178px !important;
		left: calc(50% - 90px) !important;
	}
	.destacado > .top > .username {
		bottom: -72px !important;
	}
}
@media (max-width: 1240px) {
	.destacado > .top > img.top_destacado {
		width: 176px !important;
		height: 176px !important;
		left: calc(50% - 89px) !important;
	}

	.destacado > .top > .username {
		bottom: -68px !important;
	}
}

@media (max-width: 1213px) {
	.destacado > .top > .username {
		bottom: -64px !important;
	}
}
@media (max-width: 1185px) {
	.destacado > .top > img.top_destacado {
		width: 167px !important;
		height: 167px !important;
		left: calc(50% - 85px) !important;
		top: 98px !important;
	}
	.destacado > .top > .username {
		bottom: -59px !important;
	}
}
@media (max-width: 1170px) {
	.destacado > .top > .username {
		bottom: -53px !important;
	}
}
@media (max-width: 1125px) {
	.destacado > .top > img.top_destacado {
		width: 158px !important;
		height: 158px !important;
		left: calc(50% - 79px) !important;
		top: 100px !important;
	}

	.destacado > .top > .username {
		bottom: -51px !important;
		font-size: 22px !important;
	}
}
@media (max-width: 1111px) {
	.destacado > .top > img.fondo {
		width: 90% !important;
	}
	.destacado > .top > img.top_destacado {
		width: 170px !important;
		height: 170px !important;
		left: calc(50% - 86px) !important;
		top: 99px !important;
	}

	.destacado > .top > .username {
		bottom: -70px !important;
	}
}
@media (max-width: 1093px) {
	.destacado > .top > img.top_destacado {
		left: calc(50% - 86px) !important;
		top: 98px !important;
	}

	.destacado > .top > .username {
		bottom: -66px !important;
	}
	.destacado > .categoria > div,
	.destacado > .diamantes > .title {
		width: 320px !important;
	}
}
@media (max-width: 1077px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 300px;
	}
	.destacado > .top > .username {
		bottom: -62px !important;
	}
}
@media (max-width: 1051px) {
	.destacado > .top > img.top_destacado {
		width: 166px !important;
		height: 166px !important;
		left: calc(50% - 84px) !important;
		top: 98px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 460px) !important;
	}
	.destacado > .top > .username {
		bottom: -57px !important;
	}
}
@media (max-width: 1024px) {
	.destacado > .top > img.top_destacado {
		width: 162px !important;
		height: 162px !important;
		left: calc(50% - 82px) !important;
		top: 99px !important;
	}
	.destacado > .top > .username {
		bottom: -53px !important;
	}
}
@media (max-width: 998px) {
	.destacado > .top > img.top_destacado {
		width: 158px !important;
		height: 158px !important;
		left: calc(50% - 80px) !important;
		top: 100px !important;
	}
	.destacado > .top > .username {
		bottom: -49px !important;
	}
}
@media (max-width: 984px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 280px !important;
	}
	.destacado > .top > img.top_destacado {
		width: 156px !important;
		height: 156px !important;
		left: calc(50% - 78px) !important;
		top: 100px !important;
	}
	.destacado > .top > .username {
		bottom: -47px !important;
	}
}
@media (max-width: 970px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 250px !important;
	}
	.destacado > .top > .username {
		bottom: -44px !important;
	}
}
@media (max-width: 948px) {
	.destacado > .top > img.top_destacado {
		width: 149px !important;
		height: 149px !important;
		left: calc(50% - 76px) !important;
		top: 102px !important;
	}
	.destacado > .top > .username {
		bottom: -40px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 415px) !important;
	}
	.destacado > .diamantes,
	.destacado > .categoria {
		top: 250px !important;
	}
}
@media (max-width: 929px) {
	.destacado > video {
		object-fit: fill !important;
	}
	.destacado > .top > img.top_destacado {
		width: 149px !important;
		height: 149px !important;
		left: calc(50% - 76px) !important;
		top: 102px !important;
	}
	.destacado > .top > .username {
		bottom: -36px !important;
		font-size: 20px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 398px) !important;
	}
	.destacado > .diamantes,
	.destacado > .categoria {
		top: 260px !important;
	}
}
@media (max-width: 900px) {
	.destacado > .top > img.fondo {
		width: 98% !important;
	}
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 250px !important;
	}
	.destacado > .top > .username {
		bottom: -44px !important;
	}
	.destacado > .top > img.top_destacado {
		width: 153px !important;
		height: 153px !important;
		left: calc(50% - 77px) !important;
		top: 102px !important;
	}
}
@media (max-width: 878px) {
	.destacado > .top > img.top_destacado {
		left: calc(50% - 75px) !important;
		width: 150px !important;
		height: 150px !important;
	}

	.destacado > .top > .username {
		bottom: -41px !important;
	}
	.destacado > .categoria {
		right: 9%;
	}
}
@media (max-width: 860px) {
	.destacado > .top > img.top_destacado {
		top: 103px !important;
		left: calc(50% - 73px) !important;
		width: 145px !important;
		height: 145px !important;
	}

	.destacado > .top > .username {
		bottom: -35px !important;
	}
	.destacado > .categoria {
		left: calc(50% + 124px) !important;
	}
}
@media (max-width: 825px) {
	.destacado > .top > img.top_destacado {
		top: 104px !important;
		left: calc(50% - 71px) !important;
		width: 140px !important;
		height: 140px !important;
	}

	.destacado > .top > .username {
		bottom: -31px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 382px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 118px) !important;
	}
}
@media (max-width: 809px) {
	.destacado > .top > img.top_destacado {
		top: 105px !important;
		left: calc(50% - 70px) !important;
		width: 137px !important;
		height: 137px !important;
	}

	.destacado > .top > .username {
		bottom: -28px !important;
	}
}
@media (max-width: 795px) {
	.destacado > .top > img.top_destacado {
		top: 106px !important;
		left: calc(50% - 68px) !important;
		width: 135px !important;
		height: 135px !important;
	}

	.destacado > .top > .username {
		bottom: -25px !important;
		font-size: 18px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 367px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 100px) !important;
	}
}
@media (max-width: 782px) {
	.destacado > .top > img.top_destacado {
		top: 106px !important;
		left: calc(50% - 67px) !important;
		width: 132px !important;
		height: 132px !important;
	}
	.destacado > .diamantes > .title > .animacion,
	.destacado > .categoria > div > .animacion {
		object-fit: fill !important;
	}
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 230px !important;
		height: 50px !important;
	}
	.destacado > .top > .username {
		bottom: -21px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 367px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 115px) !important;
	}
}
@media (max-width: 760px) {
	.destacado > .top > .username {
		bottom: -16px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 350px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 115px) !important;
	}
}
@media (max-width: 750px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 200px !important;
		height: 45px !important;
	}
	.destacado > .diamantes,
	.destacado > .categoria {
		top: 264px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 335px) !important;
	}
	.destacado > .top > img.top_destacado {
		width: 130px !important;
		height: 130px !important;
		left: calc(50% - 65px) !important;
		top: 106px !important;
	}
	.destacado > .top > .username {
		bottom: -15px !important;
	}
}
@media (max-width: 732px) {
	.destacado > .top > img.top_destacado {
		width: 130px !important;
		height: 130px !important;
		left: calc(50% - 65px) !important;
		top: 105px !important;
	}
	.destacado > .top > .username {
		bottom: -13px !important;
	}
}
@media (max-width: 721px) {
	.destacado > .top > img.top_destacado {
		width: 128px !important;
		height: 128px !important;
		left: calc(50% - 65px) !important;
		top: 105px !important;
	}
	.destacado > .top > .username {
		bottom: -9px !important;
	}
}
@media (max-width: 700px) {
	.destacado > .categoria {
		left: calc(50% + 105px) !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 313px) !important;
	}
	.destacado > .top > img.top_destacado {
		width: 125px !important;
		height: 125px !important;
		left: calc(50% - 63px) !important;
		top: 106px !important;
	}
	.destacado > .top > .username {
		bottom: -6px !important;
	}
}
@media (max-width: 686px) {
	.destacado > .top > img.top_destacado {
		width: 123px !important;
		height: 123px !important;
		left: calc(50% - 63px) !important;
		top: 106px !important;
	}
	.destacado > .top > .username {
		bottom: -3px !important;
	}
}
@media (max-width: 670px) {
	.destacado > .top > img.top_destacado {
		width: 121px !important;
		height: 121px !important;
		left: calc(50% - 62px) !important;
		top: 106px !important;
	}
	.destacado > .top > .username {
		bottom: 0 !important;
		font-size: 16px !important;
	}
}
@media (max-width: 659px) {
	.destacado > .top > .username {
		bottom: 4px !important;
	}
}
@media (max-width: 640px) {
	.destacado > .top > img.top_destacado {
		width: 121px !important;
		height: 121px !important;
		left: calc(50% - 62px) !important;
		top: 105px !important;
	}
	.destacado > .top > .username {
		bottom: 7px !important;
	}
}
@media (max-width: 630px) {
	.destacado > .top > img.top_destacado {
		width: 119px !important;
		height: 119px !important;
		left: calc(50% - 61px) !important;
		top: 106px !important;
	}
	.destacado > .top > .username {
		bottom: 7px !important;
	}
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 195px !important;
		height: 40px !important;
	}
	.destacado > .categoria {
		left: calc(50% + 95px) !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 290px) !important;
	}
}
@media (max-width: 620px) {
	.destacado > .top > img.top_destacado {
		width: 120px !important;
		height: 120px !important;
		left: calc(50% - 61px) !important;
		top: 105px !important;
	}
	.destacado > .top > .username {
		bottom: 9px !important;
	}
}
@media (max-width: 610px) {
	.destacado > .top > img.top_destacado {
		width: 119px !important;
		height: 119px !important;
		left: calc(50% - 61px) !important;
		top: 105px !important;
	}
	.destacado > .top > .username {
		bottom: 14px !important;
		font-size: 14px !important;
		left: calc(50% - 98px) !important;
	}
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 180px !important;
		height: 35px !important;
	}
	.destacado > .categoria {
		left: calc(50% + 85px) !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 275px) !important;
	}
}
@media (max-width: 595px) {
	.destacado > .top > img.top_destacado {
		width: 117px !important;
		height: 117px !important;
		left: calc(50% - 59px) !important;
		top: 105px !important;
	}
	.destacado > .top > .username {
		bottom: 17px !important;
	}
}
@media (max-width: 580px) {
	.destacado > .top > img.top_destacado {
		width: 115px !important;
		height: 115px !important;
		left: calc(50% - 59px) !important;
		top: 105px !important;
	}
	.destacado > .top > .username {
		bottom: 19px !important;
	}
}
@media (max-width: 572px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 160px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 246px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 85px) !important;
	}
	.destacado > .top > img.top_destacado {
		width: 112px !important;
		height: 112px !important;
		left: calc(50% - 57px) !important;
		top: 107px !important;
	}
	.destacado > .top > .username {
		bottom: 20px !important;
	}
}
@media (max-width: 560px) {
	.destacado > .top > img.top_destacado {
		width: 109px !important;
		height: 109px !important;
		left: calc(50% - 55px) !important;
		top: 107px !important;
	}
	.destacado > .top > .username {
		bottom: 23px !important;
	}
}
@media (max-width: 540px) {
	.destacado > .top > img.top_destacado {
		width: 107px !important;
		height: 107px !important;
		left: calc(50% - 55px) !important;
		top: 107px !important;
	}
	.destacado > .top > .username {
		bottom: 27px !important;
	}
}
@media (max-width: 520px) {
	.destacado > .top > img.top_destacado {
		width: 105px !important;
		height: 105px !important;
		left: calc(50% - 53px) !important;
		top: 107px !important;
	}
	.destacado > .top > .username {
		bottom: 30px !important;
	}
}
@media (max-width: 500px) {
	.destacado > .top > img.top_destacado {
		width: 103px !important;
		height: 103px !important;
		left: calc(50% - 52px) !important;
		top: 107px !important;
	}
	.destacado > .top > .username {
		bottom: 33px !important;
	}
	.destacado > .categoria {
		left: calc(50% + 68px) !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 228px) !important;
	}
}
@media (max-width: 492px) {
	.destacado > .top > img.top_destacado {
		width: 99px !important;
		height: 99px !important;
		left: calc(50% - 50px) !important;
		top: 109px !important;
	}
	.destacado > .top > .username {
		bottom: 36px !important;
	}
}
@media (max-width: 480px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 150px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 214px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 70px) !important;
	}
	.destacado > .top > img.top_destacado {
		width: 96px !important;
		height: 96px !important;
		left: calc(50% - 49px) !important;
		top: 110px !important;
	}
	.destacado > .top > .username {
		bottom: 37px !important;
	}
}
@media (max-width: 471px) {
	.destacado > .top > img.top_destacado {
		width: 95px !important;
		height: 95px !important;
		left: calc(50% - 49px) !important;
		top: 110px !important;
	}
	.destacado > .top > .username {
		bottom: 39px !important;
	}
}
@media (max-width: 463px) {
	.destacado > .top > img.top_destacado {
		width: 93px !important;
		height: 93px !important;
		left: calc(50% - 48px) !important;
		top: 110px !important;
	}
	.destacado > .top > .username {
		bottom: 41px !important;
	}
	.top-creadores > .top-seleccionado,
	.top-creadores > .top-agencias {
		background-size: 100% 105%;
	}
}
@media (max-width: 454px) {
	.destacado > .top > img.top_destacado {
		width: 91px !important;
		height: 91px !important;
		left: calc(50% - 46px) !important;
		top: 111px !important;
	}
	.destacado > .top > .username {
		bottom: 43px !important;
	}
	.avatar-tabla {
		width: 40px !important;
		height: 40px !important;
	}
}
@media (max-width: 440px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 120px !important;
		height: 35px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 208px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 60px) !important;
	}
	.destacado > .top > img.top_destacado {
		width: 86px !important;
		height: 86px !important;
		left: calc(50% - 43px) !important;
		top: 113px !important;
	}
	.destacado > .top > .username {
		bottom: 45px !important;
	}
}
@media (max-width: 425px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 130px !important;
		height: 35px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 198px) !important;
		font-size: 14px !important;
	}
	.destacado > .categoria {
		left: calc(50% + 45px) !important;
	}
	.destacado > .top > img.top_destacado {
		width: 84px !important;
		height: 84px !important;
		left: calc(50% - 43px) !important;
		top: 113px !important;
	}
	.destacado > .top > .username {
		bottom: 48px !important;
	}
}
@media (max-width: 415px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 120px !important;
		height: 29px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 178px) !important;
	}
	.destacado > .diamantes > div > p {
		font-size: 14px !important;
	}
	.destacado > .categoria > h2 {
		font-size: 17px !important;
	}
	.destacado > .categoria {
		left: calc(50% + 65px) !important;
	}
	.destacado > .top > img.top_destacado {
		width: 82px !important;
		height: 82px !important;
		left: calc(50% - 42px) !important;
		top: 114px !important;
	}
	.destacado > .top > .username {
		bottom: 50px !important;
	}
}
@media (max-width: 400px) {
	.destacado > .top > img.top_destacado {
		width: 80px !important;
		height: 80px !important;
		left: calc(50% - 41px) !important;
		top: 114px !important;
	}
	.destacado > .top > .username {
		bottom: 52px !important;
	}
	.top-creadores > .top-seleccionado,
	.top-creadores > .top-agencias {
		width: 98% !important;
		padding-left: 41px;
		padding-right: 41px;
	}
}
@media (max-width: 388px) {
	.destacado > .top > img.top_destacado {
		width: 78px !important;
		height: 78px !important;
		left: calc(50% - 39px) !important;
		top: 114px !important;
	}
	.destacado > .top > .username {
		bottom: 55px !important;
	}
	.avatar-tabla {
		width: 38px !important;
		height: 38px !important;
	}
}
@media (max-width: 378px) {
	.destacado > .top > img.top_destacado {
		width: 76px !important;
		height: 76px !important;
		left: calc(50% - 39px) !important;
		top: 114px !important;
	}
	.destacado > .top > .username {
		bottom: 57px !important;
	}
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 115px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 170px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 52px) !important;
	}
}
@media (max-width: 350px) {
	.destacado > .top > img.top_destacado {
		width: 70px !important;
		height: 70px !important;
		left: calc(50% - 35px) !important;
		top: 116px !important;
	}
	.destacado > .top > .username {
		bottom: 61px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 160px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 45px) !important;
	}
}
@media (max-width: 325px) {
	.destacado > .top > img.top_destacado {
		width: 68px !important;
		height: 68px !important;
		left: calc(50% - 34px) !important;
		top: 116px !important;
	}
	.destacado > .top > .username {
		bottom: 67px !important;
	}
	.destacado > .diamantes {
		left: calc(50% - 151px) !important;
	}
	.destacado > .categoria {
		left: calc(50% + 41px) !important;
	}
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 109px !important;
	}
}
/*
@media (max-width: 1010px) {
	.destacado > .top > img.top_destacado {
		bottom: 44px !important;
		left: calc(50% - 53px) !important;
		width: 104px !important;
		height: 104px !important;
	}

	.destacado > .top > .username {
		bottom: -30px !important;
	}
}

@media (max-width: 977px) {
	.destacado > .top > img.top_destacado {
		bottom: 47px !important;
		left: calc(50% - 51px) !important;
		width: 100px !important;
		height: 100px !important;
	}

	.destacado > .top > .username {
		bottom: -24px !important;
		font-size: 16px !important;
	}
}
@media (max-width: 958px) {
	.destacado > .top > img.top_destacado {
		bottom: 48px !important;
		left: calc(50% - 50px) !important;
		width: 100px !important;
		height: 100px !important;
	}

	.destacado > .top > .username {
		bottom: -18px !important;
	}
}
@media (max-width: 911px) {
	.destacado > .top > img.top_destacado {
		bottom: 52px !important;
		left: calc(50% - 49px) !important;
		width: 95px !important;
		height: 95px !important;
	}

	.destacado > .top > .username {
		bottom: -12px !important;
	}
}
@media (max-width: 878px) {
	.destacado > .top > img.top_destacado {
		bottom: 56px !important;
		left: calc(50% - 46px) !important;
		width: 90px !important;
		height: 90px !important;
	}

	.destacado > .top > .username {
		bottom: -6px !important;
	}
	.destacado > .categoria {
		right: 9%;
		top: 224px;
	}
}
@media (max-width: 850px) {
	.destacado > .top > img.top_destacado {
		bottom: 60px !important;
		left: calc(50% - 43px) !important;
		width: 85px !important;
		height: 85px !important;
	}

	.destacado > .top > .username {
		bottom: -2px !important;
	}
	.destacado > .diamantes {
		left: 30px !important;
	}
	.destacado > .categoria {
		right: 45px !important;
	}
}
@media (max-width: 840px) {
	.destacado > .top > img.top_destacado {
		bottom: 60px !important;
		left: calc(50% - 43px) !important;
		width: 85px !important;
		height: 85px !important;
	}

	.destacado > .top > .username {
		bottom: -2px !important;
	}
}
@media (max-width: 812px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 88px) !important;
		left: calc(50% - 50px) !important;
		width: 100px !important;
		height: 100px !important;
	}

	.destacado > .top > img.fondo {
		width: 95% !important;
	}
	.destacado > .top > .username {
		bottom: -20px !important;
	}
}
@media (max-width: 766px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 88px) !important;
		left: calc(50% - 50px) !important;
		width: 100px !important;
		height: 100px !important;
	}
	.destacado > .top > .username {
		bottom: -11px !important;
	}

	.destacado > .diamantes {
		left: 20px !important;
	}
	.destacado > .categoria {
		right: 30px !important;
	}
}
@media (max-width: 733px) {
	.containerC {
		flex-direction: column;
		align-items: center !important;
	}
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 79px) !important;
		left: calc(50% - 46px) !important;
		width: 90px !important;
		height: 90px !important;
	}
	.destacado > .top > .username {
		bottom: -5px !important;
	}

	.destacado > .diamantes {
		left: 20px !important;
	}
	.destacado > .categoria {
		right: 30px !important;
	}
}
@media (max-width: 700px) {
	.destacado > .top > img.fondo {
		width: 99% !important;
	}
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 79px) !important;
		left: calc(50% - 46px) !important;
		width: 90px !important;
		height: 90px !important;
	}
	.destacado > .top > .username {
		bottom: -6px !important;
	}

	.destacado > .diamantes {
		left: 20px !important;
	}
	.destacado > .categoria {
		right: 30px !important;
	}
}
@media (max-width: 678px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 76px) !important;
		left: calc(50% - 43px) !important;
		width: 86px !important;
		height: 86px !important;
	}
	.destacado > .top > .username {
		bottom: -1px !important;
	}

	.destacado > .diamantes {
		left: 8px !important;
	}
	.destacado > .categoria {
		right: 8px !important;
	}
}
@media (max-width: 660px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 190px !important;
		height: 40px !important;
	}
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 76px) !important;
		left: calc(50% - 43px) !important;
		width: 86px !important;
		height: 86px !important;
	}
	.destacado > .top > .username {
		bottom: 1px !important;
		font-size: 15px !important;
	}

	.destacado > .diamantes,
	.destacado > .categoria {
		top: 255px !important;
	}
}
@media (max-width: 635px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 71px) !important;
		left: calc(50% - 41px) !important;
		width: 81px !important;
		height: 81px !important;
	}
	.destacado > .top > .username {
		bottom: 7px !important;
		left: calc(50% - 99px) !important;
	}
}
@media (max-width: 610px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 69px) !important;
		left: calc(50% - 40px) !important;
		width: 79px !important;
		height: 79px !important;
	}
	.destacado > .top > .username {
		bottom: 13px !important;
		font-size: 14px !important;
	}
}
@media (max-width: 585px) {
	.destacado > .diamantes > .title > .animacion,
	.destacado > .categoria > div > .animacion {
		background-size: contain !important;
	}
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 65px) !important;
		left: calc(50% - 39px) !important;
		width: 76px !important;
		height: 75px !important;
	}
	.destacado > .top > .username {
		bottom: 17px !important;
		font-size: 13.5px !important;
	}
}
@media (max-width: 561px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 62px) !important;
		left: calc(50% - 35px) !important;
		width: 70px !important;
		height: 70px !important;
	}
	.destacado > .top > .username {
		bottom: 22px !important;
		font-size: 13px !important;
	}
}
@media (max-width: 540px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 60px) !important;
		left: calc(50% - 35px) !important;
		width: 68px !important;
		height: 68px !important;
	}
	.destacado > .top > .username {
		bottom: 27px !important;
		font-size: 13.1px !important;
	}
}
@media (max-width: 520px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 160px !important;
	}
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 60px) !important;
		left: calc(50% - 35px) !important;
		width: 68px !important;
		height: 68px !important;
	}
	.destacado > .top > .username {
		bottom: 27px !important;
	}
}
@media (max-width: 510px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 150px !important;
	}
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 57px) !important;
		left: calc(50% - 33px) !important;
		width: 66px !important;
		height: 66px !important;
	}
	.destacado > .top > .username {
		bottom: 33px !important;
	}
}
@media (max-width: 485px) {
	.destacado > .top > .username {
		bottom: 35px !important;
	}
}
@media (max-width: 472px) {
	.destacado > .top > .username {
		bottom: 39px !important;
	}
}
@media (max-width: 450px) {
	.destacado > .top > .username {
		bottom: 42px !important;
	}
}
@media (max-width: 436px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 55px) !important;
		left: calc(50% - 35px) !important;
		width: 68px !important;
		height: 68px !important;
	}

	.destacado > .top > .username {
		bottom: 45px !important;
	}

	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 130px !important;
		height: 30px !important;
	}
}
@media (max-width: 418px) {
	.destacado > .top > .username {
		bottom: 48px !important;
		font-size: 15px !important;
	}
}
@media (max-width: 400px) {
	.destacado > .top > .username {
		bottom: 51px !important;
	}
}
@media (max-width: 387px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 120px !important;
	}
	.destacado > .categoria {
		right: 2px !important;
	}
	.destacado > .top > .username {
		bottom: 51px !important;
	}
}
@media (max-width: 375px) {
	.destacado > .diamantes > .title,
	.destacado > .categoria > div {
		width: 110px !important;
	}
	.destacado > .top > .username {
		bottom: 54px !important;
	}
	.destacado > .categoria > div {
		width: 100% !important;
	}
	.destacado > .categoria {
		max-width: 141px !important;
		width: 100% !important;
		overflow: hidden !important;
	}
	.destacado > .diamantes > div:last-child > img {
		width: 30px !important;
		height: 30px !important;
	}
	.destacado > .diamantes > div:last-child > p,
	.destacado > .categoria > h2 {
		font-size: 1.2rem !important;
	}
}
@media (max-width: 360px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 47px) !important;
		left: calc(50% - 31px) !important;
		width: 60px !important;
		height: 60px !important;
	}
	.destacado > .top > .username {
		bottom: 58px !important;
	}
}
@media (max-width: 345px) {
	.destacado > .top > img.top_destacado {
		bottom: calc(50% - 47px) !important;
		left: calc(50% - 31px) !important;
		width: 60px !important;
		height: 60px !important;
	}
	.destacado > .top > .username {
		bottom: 63px !important;
	}
	.destacado > .categoria {
		width: 120px !important;
	}
}
@media (max-width: 320px) {
	.destacado > .top > .username {
		bottom: 65px !important;
	}
	.destacado > .categoria {
		width: 100px !important;
	}
} */
</style>