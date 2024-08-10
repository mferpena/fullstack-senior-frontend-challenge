<template>
  <form @submit.prevent="submitForm" class="max-w-md mx-auto bg-white p-8 rounded shadow-md">
    <div class="mb-4">
      <label for="monedaOrigen" class="block text-gray-700">Moneda Origen</label>
      <select v-model="form.monedaOrigen" id="monedaOrigen" class="w-full px-4 py-2 border rounded" required>
        <option value="" disabled>Seleccione la moneda</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="PEN">PEN</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="monedaDestino" class="block text-gray-700">Moneda Destino</label>
      <select v-model="form.monedaDestino" id="monedaDestino" class="w-full px-4 py-2 border rounded" required>
        <option value="" disabled>Seleccione la moneda</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="PEN">PEN</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="monto" class="block text-gray-700">Monto</label>
      <input type="number" v-model="form.monto" id="monto" class="w-full px-4 py-2 border rounded" required min="0"
        step="0.01" max="9999999" />
    </div>
    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Enviar</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'ExchangeForm',
  setup() {
    const form = ref({
      monedaOrigen: '',
      monedaDestino: '',
      monto: null
    })

    const submitForm = async () => {
      if (form.value.monedaOrigen === form.value.monedaDestino) {
        alert('La moneda de origen y destino no pueden ser la misma');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/exchange', form.value)
        alert('Operación registrada con éxito')
      } catch (error) {
        alert('Error al registrar la operación')
      }
    }

    return { form, submitForm }
  }
})
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
