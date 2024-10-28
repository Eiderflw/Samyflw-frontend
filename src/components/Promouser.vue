<template>
	<div class="promo">
		<Toast />
		<Panel>
			<template #header>
				<div class="flex flex-wrap items-center gap-2 flex-end w-full justify-content-between">
					<h1 class="m-0">Ordenes</h1>
				</div>
			</template>
			<DataTable
				:value="ordenes"
				sortField="estado"
				:sortOrder="1"
				paginator
				:rows="5"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				tableStyle="min-width: 100%"
			>
				<Column field="fecha" header="Fecha" sortable style="min-width: 11rem">
					<template #body="props">{{ props.data.fecha.slice(0, 10) }} {{ props.data.fecha.slice(11, 16) }}</template>
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
				<Column field="status" header="Estado" sortable />
			</DataTable>
		</Panel>
	</div>
</template>

<script>
import axios from "axios";
import { useStoreEvento } from "../store";

export default {
	data: () => ({
		API: import.meta.env.VITE_APP_API,
		store: null,
		token: { headers: { Authorization: null } },
		ordenes: [],
	}),
	methods: {
		async getMisOrdenes() {
			await axios
				.get(`${this.API}/usuario/${this.store.getUsuario().usuario}/ordenes`, this.token)
				.then((response) => {
					this.ordenes = response.data.ordenes;
				})
				.catch((error) => {
					switch (error.response.data.statusCode) {
						case 401:
							//Se le termino la sesión
							this.store.clearUser();
							this.$router.push("/login");
							break;
						default:
							this.$toast.add({ severity: "danger", summary: "Obteniendo ordenes", detail: error.response.data.message, life: 1500 });
							console.log("Error: ", error);
							break;
					}
				});
		},
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
		};

		await this.getMisOrdenes();
	},
};
</script>
