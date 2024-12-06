<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="12" md="12" lg="12" xl="12">
        <v-row>
          <v-col cols="auto">
            <v-btn @click="toggleTheme">
              Tema: {{ $vuetify.theme.global.name }}
            </v-btn>
          </v-col>
          <v-col  xs="12" sm="3" md="3" lg="3" xl="3" col="12">
            <v-btn @click="createTarea" color="secondary"> <v-icon>mdi-plus</v-icon>Nueva tarea </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col  xs="12" sm="3" md="3" lg="3" xl="3" col="12">
            <v-select
              v-model="select"
              :items="items"
              @update:modelValue="selectItem"
              item-title="text"
              item-value="value"
              label="Estado"
              
              
            ></v-select>
            <v-btn @click="fetchTasks" color="secondary"> <v-icon>mdi-eraser</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col xs="12" sm="12" md="12" lg="12" xl="12">
        <v-data-table :headers="headers" :items="tasks" item-value="id" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Lista de Tareas</v-toolbar-title>
            </v-toolbar>
          </template>
           <template v-slot:[`item.ajuste`]="{ item }"> 
            <v-btn v-if="(item['estado']==1|| item['estado']==null)" @click="completeTask(item['id'])" color="green" variant="text" >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.fecha_creacion`]="{ item }"> {{ formatFecha(item['fecha_creacion']) }}
          </template>
          <template v-slot:[`item.estado`]="{ item }"> 
            {{ (item['estado']==1||item['estado']==null)?'En proceso':'Completada'}}
          </template>
          <template v-slot:[`item.fecha_limite`]="{ item }"> {{ formatFecha(item['fecha_limite']) }} </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="selectedTarea(item)" color="primary" outline >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
             <v-btn @click="deteleTarea(item['id'])" color="red"  >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="isEditing">Editar Tarea</span>
          <span class="text-h5" v-else>Crear Tarea</span>
        </v-card-title>
        <v-card-text>
          <FormTarea :tarea="selectedTask"
          :isEditing="isEditing"
          @close="showDialog = false"
          @closeDialog="handleCloseDialog" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showDialog = false" color="secondary">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted
} from "vue";
// import axios from "axios";
import api from "../services/api";
import {
  useTheme
} from "vuetify";
const theme = useTheme();
const selectedTask = ref({
  id: null,
  titulo: "",
  descripcion: "",
  fecha_limite: "",
});
const select=ref('');
const items = ref([
  { text: 'Completada', value: 2 }, 
  { text: 'En proceso', value: 1 },
]);

const showDialog = ref(false);
const headers = ref([{
  title: "Ajuste",
  value: "ajuste",
  sortable: false
},
{
  title: "Titulo",
  value: "titulo"
},
{
  title: "Descripcion",
  value: "descripcion"
},
{
  title: "Fecha creación",
  value: "fecha_creacion"
},
{
  title: "Fecha limite",
  value: "fecha_limite"
},
{
  title: "Estado",
  value: "estado"
},
{
  title: "Acciones",
  value: 'actions',
  sortable: false
}
]);
const tasks = ref([]);
const isEditing = ref(false); // se esta editando?
const fetchTasks = async () => {
  try {
    const response = await api.get("/get-tareas");
    console.log(response);
    tasks.value = response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
// cambiamos de tema?
const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value === "dark" ? "light" : "dark";
};
const selectedTarea = (item: any) => {
  console.log(item)
  isEditing.value=true;
  showDialog.value = true;
  selectedTask.value = {...item, fecha_creacion:formatFecha(item.fecha_creacion), fecha_limite:formatFecha(item.fecha_limite)};
};
// estos valores por default
const createTarea =()=>{
  selectedTask.value = {
  id: null,
  titulo: "",
  descripcion: "",
  fecha_limite: "",
};
  isEditing.value=false;
  showDialog.value = true;

}
// por si acaso
const restoreDefaults =()=>{
  selectedTask.value = {
    id: null,
    titulo: "",
    descripcion: "",
    fecha_limite: "",
  };
}
// para que el formato de fecha sea la adecuada
function formatFecha(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const handleCloseDialog = () => {
  // cerrar y obtener
  showDialog.value= false;
  fetchTasks();
};

onMounted(fetchTasks);

const deteleTarea = async (id:any) => {
  try {
    const response = await api.delete("/delete-tarea/"+id);
    console.log("Tarea eliminada:", response.data);
  } catch (error) {
    console.error("Error creando tarea:", error);
  }
  fetchTasks();
};
const filterTareas = async () => {
  try {
    const params = new URLSearchParams({ estado: select.value });
    const response = await api.get(`/filter-tareas?${params.toString()}`);
    console.log(response);
    tasks.value = response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
function selectItem() { 
  filterTareas();
}
const completeTask = async (id:any) => {
  try { 
    const response = await api.put(`/complete-tarea/${id}`);
  } catch (error) { 
    console.error('Error al actualizar el estado de la tarea:', error);
   } 
   fetchTasks();
};
</script>