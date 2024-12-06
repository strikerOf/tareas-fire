<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="task.titulo"
        :rules="tituloRules"
        label="Título"
        required
      ></v-text-field>
      <v-select
        v-model="task.estado"
        :items="items"
        item-title="text"
        item-value="value"
        label="Estado"
      ></v-select>
      <v-textarea
        v-model="task.descripcion"
        :rules="descripcionRules"
        label="Descripción"
        required
      ></v-textarea>

      <v-text-field
        v-model="task.fecha_limite"
        :rules="fechaLimiteRules"
        label="Fecha Límite"
        type="date"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="primary" @click="createOrUpdate">
        {{ isEditing ? "Actualizar Tarea" : "Crear Tarea" }}
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits} from "vue";
import { useRouter } from "vue-router";
import api from "../services/api"; // Asegúrate de tener configurado api.js o api.ts para las solicitudes

const { tarea,isEditing } = defineProps<{
  tarea: {
    id?: number;
    titulo: string;
    descripcion: string;
    fecha_limite: string;
    estado:number
  },
  isEditing: boolean
}>();
const select=ref('');
const items = ref([
  { text: 'Completada', value: 2 }, 
  { text: 'En proceso', value: 1 },
]);
const task = ref({
  titulo: "",
  descripcion: "",
  fecha_limite: "",
  estado:1
});
watch(
  () => tarea,
  (newTarea) => {
    if (newTarea) {
      task.value = { ...newTarea };
    }
  },
  { immediate: true }
);
const valid = ref(false);
// Validation rules
const tituloRules = [
  (v: string) => !!v || "El título es requerido",
  (v: string) =>
    (v && v.length <= 50) || "El título debe tener 50 caracteres o menos",
];

const descripcionRules = [(v: string) => !!v || "La descripción es requerida"];

const fechaCreacionRules = [
  (v: string) => !!v || "La fecha de creación es requerida",
];

const fechaLimiteRules = [(v: string) => !!v || "La fecha límite es requerida"];
const createOrUpdate  = async()=>{
  if (isEditing) {
    updateTarea();
  }else{
    createTarea();
  }
};
const createTarea = async () => {
  if (!valid.value) {
    return;
  }
  try {
    const response = await api.post("/add-tarea", task.value);
    console.log("Tarea creada:", response.data);
    emit("closeDialog"); 
  } catch (error) {
    console.error("Error creando tarea:", error);
  }
};
const updateTarea = async () => {
  if (!valid.value) {
    return;
  }
  try {
    const response = await api.put("/update-tarea/"+tarea.id, task.value);
    console.log("Tarea actualzada:", response.data);
    emit("closeDialog"); 
  } catch (error) {
    console.error("Error creando tarea:", error);
  }
};
const emit = defineEmits<{
  (event: "closeDialog"): void;
}>();
</script>

<style scoped></style>
