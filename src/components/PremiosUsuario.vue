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
            <Column field="tipo_premio" header="Premio">
            </Column>
            <Column header="Valor" field="premio" sortable>
                <template #body="slotProps">
                    <p class="m-0" v-if="slotProps.data.tipo_premio !== 'Objeto'">{{ slotProps.data.premio }}</p>
                    <Image v-else :src="slotProps.data.premio" alt="Imagen del premio" width="250" preview />
                </template>
            </Column>
            <Column header="Descripcion" field="descripcion" sortable>
            </Column>
            <Column header="Fecha" field="fecha_obtenido" sortable style="width: 35%">
                <template #body="slotProps">
                    <div v-if="slotProps.data.estado == 'Sin reclamar' || slotProps.data.estado == 'En proceso'">
                        {{ slotProps.data.fecha_obtenido ? slotProps.data.fecha_obtenido.slice(0, 10) : '' }}
                    </div>
                    <div v-else>
                        {{ slotProps.data.transferencia && slotProps.data.transferencia.fecha_reclamado ?
            slotProps.data.transferencia.fecha_reclamado.slice(0, 10) : '' }}
                    </div>
                </template>
            </Column>
            <Column field="estado" header="Estado" sortable>
                <template #body="slotProps">
                    <Tag :severity="ponerEstado(slotProps.data.estado)"
                        :value="`${slotProps.data.estado === 'Reclamado' ? ('Reclamado | ' + slotProps.data.transferencia.fecha_reclamado.slice(0, 10)) : slotProps.data.estado}`" />
                </template>
            </Column>
            <Column header="Acciones">
                <template #body="slotProps">
                    <Button v-if="slotProps.data.estado == 'Sin reclamar'" icon="pi pi-send" @click="() => {
            Reclamar(slotProps.data.tipo_premio, slotProps.data.id_concurso, slotProps.data.estado);
        }"></Button>
                    <Image v-tooltip.top="'Comprobante de entrega'" v-if="slotProps.data.estado == 'Entregado'"
                        :src="slotProps.data.transferencia.comprobante" alt="Imagen del premio" width="50" preview />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="cuenta" :header="mensaje" :style="{ width: '35rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="center" :modal="true" :draggable="false">
            <div class="flex flex-wrap gap-2 mb-2" v-if="dialogo === 'Efectivo'">
                <RadioButton v-model="cuentas" inputId="1" name="neuqi" value="nequi" />
                <label class="ml-2">Nequi</label>
                <RadioButton v-model="cuentas" inputId="2" name="paypal" value="paypal" />
                <label class="ml-2">Paypal</label>
                <RadioButton v-model="cuentas" inputId="3" name="binance" value="binance" />
                <label class="ml-2">Binance</label>
                <RadioButton v-model="cuentas" inputId="4" name="banco" value="banco" />
                <label class="ml-2">Banco</label>
            </div>

            <form ref="formEnviar" class="formEnviar">
                <div v-if="dialogo === 'Efectivo'">
                    <div class="flex gap-2 sm:flex-column md:flex-row" v-if="cuentas === 'banco'">
                        <div class="flex flex-column gap-2 w-6 sm:w-full md:w-6">
                            <label class="font-semibold">Tipo de Cuenta</label>
                            <Dropdown v-model="transferencia.tipo_cuenta" :options="TipoCuenta" optionLabel="tipo"
                                placeholder="Tipo de cuenta" />
                        </div>
                        <div class="flex flex-column gap-2 w-6 sm:w-full md:w-6" v-if="cuentas === 'banco'">
                            <label class="font-semibold">Numero de Cuenta</label>
                            <InputNumber v-model="transferencia.cuenta" inputId="withoutgrouping" :useGrouping="false"
                                autocomplete="off" />
                        </div>
                    </div>
                    <div class="flex flex-column gap-2" v-if="cuentas === 'nequi'">
                        <label class="font-semibold ">Numero De Cuenta</label>
                        <InputNumber v-model="transferencia.cuenta" inputId="withoutgrouping" :useGrouping="false" />
                    </div>
                    <div class="flex flex-column gap-2" v-if="cuentas === 'paypal'">
                        <label class="font-semibold">Correo</label>
                        <InputText v-model="transferencia.cuenta" type="email" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex flex-column gap-2" v-if="cuentas === 'banco'">
                        <label class="font-semibold">Nombre Del Banco</label>
                        <InputText v-model="transferencia.banco" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex flex-column gap-2" v-if="cuentas === 'banco'">
                        <label class="font-semibold">Nombre Del Titular</label>
                        <InputText v-model="transferencia.titular_cuenta" class="flex-auto" autocomplete="off" />
                    </div>

                    <div class="flex flex-column gap-2" v-if="cuentas === 'binance'">
                        <label class="font-semibold ">ID Binance</label>
                        <InputText v-model="transferencia.cuenta" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex flex-column gap-2" v-if="cuentas === 'banco'">
                        <label class="font-semibold">Numero de Cedula</label>
                        <InputNumber v-model="transferencia.cedula" inputId="withoutgrouping" :useGrouping="false"
                            autocomplete="off" />
                    </div>
                </div>
                <div v-if="dialogo === 'Envio'">
                    {{ transferencia }}
                    <div class="flex gap-2 sm:flex-column md:flex-row">
                        <div class="flex flex-column gap-2 w-6 sm:w-full md:w-6">
                            <label class="font-semibold">Pais</label>
                            <Dropdown v-model="paisSelect" filter
                                @update:modelValue="(event) => transferencia.pais = event.pais" :options="paises"
                                optionLabel="pais" placeholder="Pais" />
                        </div>
                        <div class="flex flex-column gap-2">
                            <label class="font-semibold">Codigo postal</label>
                            <InputNumber v-model="transferencia.codigo_postal" inputId="withoutgrouping"
                                :useGrouping="false" autocomplete="off" />
                        </div>
                    </div>
                    <div class="flex gap-2 sm:flex-column md:flex-row">
                        <div class="flex flex-column gap-2">
                            <label class="font-semibold">Departamento</label>
                            <InputText v-model="transferencia.departamento" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex flex-column gap-2">
                            <label class="font-semibold">Ciudad</label>
                            <InputText v-model="transferencia.ciudad" class="flex-auto" autocomplete="off" />
                        </div>
                    </div>
                    <div class="flex flex-column gap-2">
                        <label class="font-semibold">Direccion</label>
                        <InputText v-model="transferencia.direccion" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex flex-column gap-2">
                        <label class="font-semibold">Numero de Cedula</label>
                        <InputNumber v-model="transferencia.cedula" inputId="withoutgrouping" :useGrouping="false"
                            autocomplete="off" />
                    </div>
                    <div class="flex flex-column gap-2">
                        <label class="font-semibold">Nombre Del Titular</label>
                        <InputText v-model="transferencia.titular_cuenta" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex flex-column gap-2">
                        <label class="font-semibold">Telefono</label>
                        <InputNumber v-model="transferencia.telefono" inputId="withoutgrouping" :useGrouping="false"
                            autocomplete="off" />
                    </div>

                </div>
            </form>
            <template #footer>
                <Button label="Cancelar" @click="cuenta = false, cuentas = 'nequi'" text severity="danger" />
                <Button label="Enviar" @click="Enviar" text autofocus></Button>
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
        mensaje: null,
        dialogo: null,
        cuentas: "nequi",
        usuario: null,
        paisSelect: { pais: null },
        TipoCuenta: [
            { tipo: 'Ahorro' },
            { tipo: 'Corriente' }
        ],
        mostrarMensajeValidacion: false,
        premios: [],
        transferencia: {},
        paises: [
            { "pais": "Afganistán" },
            { "pais": "Albania" },
            { "pais": "Alemania" },
            { "pais": "Andorra" },
            { "pais": "Angola" },
            { "pais": "Antigua y Barbuda" },
            { "pais": "Arabia Saudita" },
            { "pais": "Argelia" },
            { "pais": "Argentina" },
            { "pais": "Armenia" },
            { "pais": "Australia" },
            { "pais": "Austria" },
            { "pais": "Azerbaiyán" },
            { "pais": "Bahamas" },
            { "pais": "Bangladés" },
            { "pais": "Barbados" },
            { "pais": "Baréin" },
            { "pais": "Bélgica" },
            { "pais": "Belice" },
            { "pais": "Benín" },
            { "pais": "Bielorrusia" },
            { "pais": "Birmania" },
            { "pais": "Bolivia" },
            { "pais": "Bosnia y Herzegovina" },
            { "pais": "Botsuana" },
            { "pais": "Brasil" },
            { "pais": "Brunéi" },
            { "pais": "Bulgaria" },
            { "pais": "Burkina Faso" },
            { "pais": "Burundi" },
            { "pais": "Bután" },
            { "pais": "Cabo Verde" },
            { "pais": "Camboya" },
            { "pais": "Camerún" },
            { "pais": "Canadá" },
            { "pais": "Catar" },
            { "pais": "Chad" },
            { "pais": "Chile" },
            { "pais": "China" },
            { "pais": "Chipre" },
            { "pais": "Ciudad del Vaticano" },
            { "pais": "Colombia" },
            { "pais": "Comoras" },
            { "pais": "Corea del Norte" },
            { "pais": "Corea del Sur" },
            { "pais": "Costa de Marfil" },
            { "pais": "Costa Rica" },
            { "pais": "Croacia" },
            { "pais": "Cuba" },
            { "pais": "Dinamarca" },
            { "pais": "Dominica" },
            { "pais": "Ecuador" },
            { "pais": "Egipto" },
            { "pais": "El Salvador" },
            { "pais": "Emiratos Árabes Unidos" },
            { "pais": "Eritrea" },
            { "pais": "Eslovaquia" },
            { "pais": "Eslovenia" },
            { "pais": "España" },
            { "pais": "Estados Unidos" },
            { "pais": "Estonia" },
            { "pais": "Etiopía" },
            { "pais": "Filipinas" },
            { "pais": "Finlandia" },
            { "pais": "Fiyi" },
            { "pais": "Francia" },
            { "pais": "Gabón" },
            { "pais": "Gambia" },
            { "pais": "Georgia" },
            { "pais": "Ghana" },
            { "pais": "Granada" },
            { "pais": "Grecia" },
            { "pais": "Guatemala" },
            { "pais": "Guyana" },
            { "pais": "Guinea" },
            { "pais": "Guinea ecuatorial" },
            { "pais": "Guinea-Bisáu" },
            { "pais": "Haití" },
            { "pais": "Honduras" },
            { "pais": "Hungría" },
            { "pais": "India" },
            { "pais": "Indonesia" },
            { "pais": "Irak" },
            { "pais": "Irán" },
            { "pais": "Irlanda" },
            { "pais": "Islandia" },
            { "pais": "Islas Marshall" },
            { "pais": "Islas Salomón" },
            { "pais": "Israel" },
            { "pais": "Italia" },
            { "pais": "Jamaica" },
            { "pais": "Japón" },
            { "pais": "Jordania" },
            { "pais": "Kazajistán" },
            { "pais": "Kenia" },
            { "pais": "Kirguistán" },
            { "pais": "Kiribati" },
            { "pais": "Kuwait" },
            { "pais": "Laos" },
            { "pais": "Lesoto" },
            { "pais": "Letonia" },
            { "pais": "Líbano" },
            { "pais": "Liberia" },
            { "pais": "Libia" },
            { "pais": "Liechtenstein" },
            { "pais": "Lituania" },
            { "pais": "Luxemburgo" },
            { "pais": "Madagascar" },
            { "pais": "Malasia" },
            { "pais": "Malaui" },
            { "pais": "Maldivas" },
            { "pais": "Malí" },
            { "pais": "Malta" },
            { "pais": "Marruecos" },
            { "pais": "Mauricio" },
            { "pais": "Mauritania" },
            { "pais": "México" },
            { "pais": "Micronesia" },
            { "pais": "Moldavia" },
            { "pais": "Mónaco" },
            { "pais": "Mongolia" },
            { "pais": "Montenegro" },
            { "pais": "Mozambique" },
            { "pais": "Namibia" },
            { "pais": "Nauru" },
            { "pais": "Nepal" },
            { "pais": "Nicaragua" },
            { "pais": "Níger" },
            { "pais": "Nigeria" },
            { "pais": "Noruega" },
            { "pais": "Nueva Zelanda" },
            { "pais": "Omán" },
            { "pais": "Países Bajos" },
            { "pais": "Pakistán" },
            { "pais": "Palaos" },
            { "pais": "Palestina" },
            { "pais": "Panamá" },
            { "pais": "Papúa Nueva Guinea" },
            { "pais": "Paraguay" },
            { "pais": "Perú" },
            { "pais": "Polonia" },
            { "pais": "Portugal" },
            { "pais": "Reino Unido" },
            { "pais": "República Centroafricana" },
            { "pais": "República Checa" },
            { "pais": "República de Macedonia" },
            { "pais": "República del Congo" },
            { "pais": "República Democrática del Congo" },
            { "pais": "República Dominicana" },
            { "pais": "República Sudafricana" },
            { "pais": "Ruanda" },
            { "pais": "Rumanía" },
            { "pais": "Rusia" },
            { "pais": "Samoa" },
            { "pais": "San Cristóbal y Nieves" },
            { "pais": "San Marino" },
            { "pais": "San Vicente y las Granadinas" },
            { "pais": "Santa Lucía" },
            { "pais": "Santo Tomé y Príncipe" },
            { "pais": "Senegal" },
            { "pais": "Serbia" },
            { "pais": "Seychelles" },
            { "pais": "Sierra Leona" },
            { "pais": "Singapur" },
            { "pais": "Siria" },
            { "pais": "Somalia" },
            { "pais": "Sri Lanka" },
            { "pais": "Suazilandia" },
            { "pais": "Sudán" },
            { "pais": "Sudán del Sur" },
            { "pais": "Suecia" },
            { "pais": "Suiza" },
            { "pais": "Surinam" },
            { "pais": "Tailandia" },
            { "pais": "Tanzania" },
            { "pais": "Tayikistán" },
            { "pais": "Timor Oriental" },
            { "pais": "Togo" },
            { "pais": "Tonga" },
            { "pais": "Trinidad y Tobago" },
            { "pais": "Túnez" },
            { "pais": "Turkmenistán" },
            { "pais": "Turquía" },
            { "pais": "Tuvalu" },
            { "pais": "Ucrania" },
            { "pais": "Uganda" },
            { "pais": "Uruguay" },
            { "pais": "Uzbekistán" },
            { "pais": "Vanuatu" },
            { "pais": "Venezuela" },
            { "pais": "Vietnam" },
            { "pais": "Yemen" },
            { "pais": "Yibuti" },
            { "pais": "Zambia" },
            { "pais": "Zimbabue" }
        ]

    }),
    methods: {
        async getPremios() {
            await axios
                .get(`${this.API}/usuario/${this.usuario}`, this.token)
                .then((response) => {
                    this.premios = response.data.premios;
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

        async Reclamar(tipo, posicion, estado) {
            if (estado == "Sin reclamar") {
                // sin reclamar
                if (tipo == "Objeto") {
                    this.mensaje = "Medio de envio";
                    this.dialogo = "Envio"
                    this.cuentas = "Envio"
                } else if (tipo == "Efectivo") {
                    this.mensaje = "Medio de Pago";
                    this.dialogo = "Efectivo"
                }
                this.transferencia.posPremio = posicion;
                this.cuenta = true;
                console.log(this.transferencia);
            }
        },
        Enviar() {
            this.transferencia.metodo_pago = this.cuentas;
            if (this.cuentas == "banco") {
                if (this.transferencia.cuenta == null || !/^(?!\s*$).+/.test(this.transferencia.cuenta) ||
                    this.transferencia.titular_cuenta == null || !/^(?!\s*$).+/.test(this.transferencia.titular_cuenta) ||
                    this.transferencia.cedula == null || !/^(?!\s*$).+/.test(this.transferencia.cedula) ||
                    this.transferencia.tipo_cuenta == null || !/^(?!\s*$).+/.test(this.transferencia.tipo_cuenta) ||
                    this.transferencia.banco == null || !/^(?!\s*$).+/.test(this.transferencia.banco)) {
                    this.$toast.add({ severity: 'error', summary: 'Metodo de pago', detail: 'Debes llenar todos los campos', life: 1600 });
                } else {
                    this.EnviarPremio()
                }
            } else if (this.cuentas == "nequi" || this.cuentas == "paypal" || this.cuentas == "binance") {
                if (this.transferencia.cuenta == null || !/^(?!\s*$).+/.test(this.transferencia.cuenta)) {
                    this.$toast.add({ severity: 'error', summary: 'Metodo de pago', detail: 'Debes llenar todos los campos', life: 1600 });
                } else {
                    this.EnviarPremio()
                }
            } else {
                if (this.transferencia.titular_cuenta == null || !/^(?!\s*$).+/.test(this.transferencia.titular_cuenta) ||
                    this.transferencia.cedula == null || !/^(?!\s*$).+/.test(this.transferencia.cedula) ||
                    this.transferencia.direccion == null || !/^(?!\s*$).+/.test(this.transferencia.direccion) ||
                    this.transferencia.departamento == null || !/^(?!\s*$).+/.test(this.transferencia.departamento) ||
                    this.transferencia.pais == null || !/^(?!\s*$).+/.test(this.transferencia.pais) ||
                    this.transferencia.ciudad == null || !/^(?!\s*$).+/.test(this.transferencia.ciudad) ||
                    this.transferencia.telefono == null || !/^(?!\s*$).+/.test(this.transferencia.telefono) ||
                    this.transferencia.codigo_postal == null || !/^(?!\s*$).+/.test(this.transferencia.codigo_postal)) {
                    this.$toast.add({ severity: 'error', summary: 'Metodo de pago', detail: 'Debes llenar todos los campos', life: 1600 });
                } else {
                    this.EnviarPremio()
                }

            }
        },
        async EnviarPremio() {
            await axios.put(`${this.API}/usuario/reclamarPremio`, this.transferencia, {
                headers: {
                    Authorization: `Bearer ${this.store.getToken()}`
                }
            }).then(response => {
                console.log(response.data);
            }).finally(() => {
                this.cuenta = false;
                this.$toast.add({ severity: 'success', summary: 'Reclamo exitoso', life: 1600 });
                this.transferencia = {};
                this.getPremios();
            }

            )

        },
        ponerEstado(estado) {
            if (estado == "Sin reclamar") {
                return "warning";
            } else if (estado == "En proceso") {
                return "info";
            } else {
                return "success";
            }
        }

    },

    async created() {
        this.store = useStoreEvento();
        this.usuario = this.store.getId();
        this.transferencia.usuario = this.usuario;
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