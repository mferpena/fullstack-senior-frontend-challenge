<template>
    <div class="max-w-4xl mx-auto">
        <h2 class="text-xl mb-4">Historial de Solicitudes de Cambio</h2>
        <div class="flex">
            <div class="w-1/3 pr-4 border-r">
                <div class="mb-4">
                    <label for="startDate" class="block text-gray-700">Fecha de Inicio</label>
                    <input type="date" v-model="filters.startDate" id="startDate"
                        class="w-full px-4 py-2 border rounded" />
                </div>

                <div class="mb-4">
                    <label for="endDate" class="block text-gray-700">Fecha de Fin</label>
                    <input type="date" v-model="filters.endDate" id="endDate" class="w-full px-4 py-2 border rounded" />
                </div>

                <button @click="fetchHistory" class="w-full bg-blue-500 text-white py-2 rounded mb-4">Buscar</button>
            </div>
            <div class="w-2/3 pl-4">
                <div v-for="request in paginatedRequests" :key="request._id" class="bg-white p-4 mb-4 rounded shadow">
                    <p><strong>Moneda Origen:</strong> {{ request.monedaOrigen }}</p>
                    <p><strong>Moneda Destino:</strong> {{ request.monedaDestino }}</p>
                    <p><strong>Monto:</strong> {{ request.monto }}</p>
                    <p><strong>Monto Cambiado:</strong> {{ request.montoCambiado }}</p>
                    <p><strong>Tipo de Cambio:</strong> {{ request.tipoCambio }}</p>
                    <p><strong>Fecha:</strong> {{ new Date(request.fecha).toLocaleString() }}</p>
                </div>

                <div class="flex justify-between items-center">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="px-4 py-2 bg-gray-300 rounded">Anterior</button>
                    <span>Página {{ currentPage }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="px-4 py-2 bg-gray-300 rounded">Siguiente</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import axios from 'axios';

interface ExchangeRequest {
    _id: string;
    monedaOrigen: string;
    monedaDestino: string;
    monto: number;
    montoCambiado: number;
    tipoCambio: number;
    fecha: string;
}

export default defineComponent({
    name: 'ExchangeHistory',
    setup() {
        const requests = ref<ExchangeRequest[]>([]);
        const currentPage = ref(1);
        const pageSize = 3;

        const filters = ref({
            startDate: '',
            endDate: ''
        });

        const fetchHistory = async () => {
            try {
                const { startDate, endDate } = filters.value;
                const response = await axios.get<ExchangeRequest[]>(`http://localhost:5000/api/exchange-history?startDate=${startDate}&endDate=${endDate}`);
                requests.value = response.data;
                currentPage.value = 1;  // Reset to the first page after fetching new data
            } catch (error) {
                alert('Error al obtener el historial');
            }
        };

        const paginatedRequests = computed(() => {
            const start = (currentPage.value - 1) * pageSize;
            const end = start + pageSize;
            return requests.value.slice(start, end);
        });

        const totalPages = computed(() => {
            return Math.ceil(requests.value.length / pageSize);
        });

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        return { requests, filters, fetchHistory, paginatedRequests, currentPage, totalPages, prevPage, nextPage };
    }
});
</script>

<style scoped>
.flex {
    display: flex;
}

.border-r {
    border-right: 1px solid #e5e7eb;
}

.request {
    background: #fff;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>