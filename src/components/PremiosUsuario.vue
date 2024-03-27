<template>
    <Panel class="premios">
        <Toast />
        <template #header>
            <div class="flex items-center gap-2 flex-end w-full justify-content-between">
                <h1 class="m-0">Tus Premios</h1>
                <div class="botones flex gap-2">


                </div>
            </div>
        </template>

        <DataTable :value="premios" :sortOrder="-1" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 100%">
            <Column field="grupo" header="Premio" style="width: 25%">
                <template #body="slotProps">
                    <img :src="`../assets/img/cinta_cobre.png  `" :alt="slotProps.data.image"
                        class="w-6rem border-round" />
                </template>
            </Column>
            <Column header="Valor" field="saldo" sortable style="width: 10%">
            </Column>
            <Column header="Fecha" field="fecha_actualizacion" sortable style="width: 35%">
            </Column>
            <Column field="usuario" header="Estado" sortable style="width: 15%"></Column>


            <Column header="Reclamar" style="width: 15%">
                <template #body="slotProps">
                    <Button icon="pi pi-send" @click="() => {
            cuenta = true;
        }"></Button>
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="cuenta" :header="`Medio de pago `" :style="{ width: '30rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="center" :modal="true" :draggable="false">
            <div class="flex flex-wrap gap-2 mb-2">
                <Button @click="paypal = true">
                    <img width="65" height="30" src="../assets/img/cuentas/paypal.svg" alt="">
                </Button>
                <Button @click="binance = true">
                    <img width="65" height="20" src="../assets/img/cuentas/binance.svg" alt="">
                </Button>
                <Button @click="nequi = true">
                    <img width="65" height="20" src="../assets/img/cuentas/nequi.svg" alt="">
                </Button>
                <Button @click="visa = true">
                    <img width="65" height="20" src="../assets/img/cuentas/visa.svg" alt="">
                </Button>
            </div>
            <template #footer>

                <Button label="Cancelar" @click="cuenta = false" text severity="danger" autofocus />
            </template>
        </Dialog>

        <Dialog v-model:visible="nequi" :header="`Transferencia Por Nequi`" :style="{ width: '35rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="center" :modal="true" :draggable="false">

            <form ref="formNequi" class="formNequi">
                <div class="flex flex-column gap-2">
                    <label class="font-semibold ">Numero De Cuenta</label>
                    <InputText id="NumeroCuenta" type="number" class="flex-auto" autocomplete="off" />
                    <InlineMessage v-if="mostrarMensajeValidacion">Requiere Numero de cuenta</InlineMessage>
                </div>

                <div class="flex flex-column gap-2">
                    <label class="font-semibold">Nombre Del Titular</label>
                    <InputText id="NombreTitular" class="flex-auto" autocomplete="off" />
                    <InlineMessage v-if="mostrarMensajeValidacion">Requiere Nombre del titular</InlineMessage>
                </div>
            </form>
            <template #footer>

                <Button label="Cancelar" @click="nequi = false, mostrarMensajeValidacion = false" text
                    severity="danger" />
                <Button label="Enviar" @click="EnvioNequi" text></Button>
            </template>

        </Dialog>

        <Dialog v-model:visible="paypal" modal header="Transferencia PayPal" :style="{ width: '35rem' }">

            <form ref="formEvento" class="formEvento">
                <div class="flex flex-column gap-2">
                    <label for="email" class="font-semibold">Correo</label>
                    <InputText id="emailPaypal" type="email" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex flex-column gap-2">
                    <label for="email" class="font-semibold">Nombre Del Titular</label>
                    <InputText id="email" class="flex-auto" autocomplete="off" />
                </div>
            </form>
            <template #footer>

                <Button label="Cancelar" @click="paypal = false" text severity="danger" />
                <Button label="Enviar" @click="paypal = false" text></Button>
            </template>

        </Dialog>


        <Dialog v-model:visible="visa" modal header="Transferencia Bancaria" :style="{ width: '35rem' }">
            <form ref="formEvento" class="formEvento">
                <div class="flex flex gap-1">
                    <div class="flex flex-column gap-2">
                        <label class="font-semibold">Tipo de Cuenta</label>
                        <TreeSelect v-model="tipo" :options="nodes" placeholder="tipo de cuenta"
                            class="md:w-12rem w-full" />
                    </div>
                    <div class="flex flex-column gap-2" style="margin-left: 10px;">
                        <label class="font-semibold">Numero de Cuenta</label>
                        <InputText id="NumeroCuenta" type="number" class="flex-auto md:w-19rem" autocomplete="off" />
                    </div>
                </div>
                <div class="flex flex-column gap-2">
                    <label class="font-semibold">Nombre Del Titular</label>
                    <InputText id="NombreTitular" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex flex-column gap-2">
                    <label class="font-semibold">Numero de Cedula</label>
                    <InputText id="NumeroCedula" type="number" class="flex-auto" autocomplete="off" />
                </div>

            </form>

            <template #footer>

                <Button label="Cancelar" @click="visa = false" text severity="danger" />
                <Button label="Enviar" @click="visa = false" text></Button>
            </template>


        </Dialog>

        <Dialog v-model:visible="binance" modal header="Transferencia Binance" :style="{ width: '35rem' }">

            <form ref="formEvento" class="formEvento">
                <div class="flex flex-column gap-2">
                    <label for="email" class="font-semibold ">ID Binance</label>
                    <InputText id="email" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex flex-column gap-2">
                    <label class="font-semibold ">Correo</label>
                    <InputText id="email" type="email" class="flex-auto" autocomplete="off" />
                </div>
            </form>
            <template #footer>

                <Button label="Cancelar" @click="binance = false" text severity="danger" />
                <Button label="Enviar" @click="binance = false" text></Button>
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
        token: null,
        cuenta: false,
        nequi: false,
        paypal: false,
        visa: false,
        binance: false,
        tipo: null,
        nodes: [
            {
                label: 'Ahorro',
                value: 'ahorro',
            },
            {
                label: 'Corriente',
                value: 'corriente',
            }
        ],
        mostrarMensajeValidacion: false,
        premios: []

    }),
    methods: {
        async getPremios() {
            await axios
                .get(`${this.API}/usuario`, this.token)
                .then((response) => {
                    this.premios = response.data;
                    console.log("premio ", this.premios);
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

        async EnvioNequi() {
            if (!this.$refs.formNequi.checkValidity()) {
                this.$toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: "Por favor, complete todos los campos.",
                    life: 3000,
                });
                this.mostrarMensajeValidacion = true;

            }
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
        await this.getPremios();
    }
}
</script>