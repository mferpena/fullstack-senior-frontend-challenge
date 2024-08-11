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
      <input type="text" v-model="form.monto" id="monto" class="w-full px-4 py-2 border rounded" @input="validateMonto"
        placeholder="0.00" />
    </div>
    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Enviar</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default defineComponent({
  name: 'ExchangeForm',
  setup() {
    const form = ref({
      monedaOrigen: '',
      monedaDestino: '',
      monto: ''
    })

    const validateMonto = () => {
      let value = form.value.monto
      const regex = /^(?!0\d)\d{0,7}(\.\d{0,2})?$/;

      value = value.replace(/[^0-9.]/g, '');

      if (value.includes('.')) {
        const [integerPart, decimalPart] = value.split('.');
        value = integerPart.slice(0, 7) + '.' + (decimalPart || '').slice(0, 2);
      } else {
        value = value.slice(0, 7);
      }

      if (regex.test(value)) {
        form.value.monto = value;
      }
    }

    const submitForm = async () => {
      if (form.value.monedaOrigen === form.value.monedaDestino) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La moneda de origen y destino no pueden ser la misma'
        });
        return;
      }

      try {
        await axios.post('http://ec2-44-202-13-34.compute-1.amazonaws.com:5000/api/exchange', form.value)
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Operación registrada con éxito'
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar la operación'
        })
      }
    }

    return { form, submitForm, validateMonto }
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
