<!-- Aqui esta el chat bot que se utiliza en la pagina o bueno la interfas-->
<template>
    <div>
      <VueBotUI
        :messages="data"
        :options="botOptions"
        @msg-send="messageSendHandler"
      />
    </div>
  </template>
  
  <!-- Aqui esta los metodos y llamado del chato bot-->

  <script>
  import { VueBotUI } from 'vue-bot-ui';
  import botAvatar from '../assets/blogPhotos/1.jpg'; 
  
  export default {
    components: {
      VueBotUI,
    },
    data() {
      return {
        data: [
          {
            agent: 'bot',
            type: 'text',
            text: 'Hola, ¿cómo puedo ayudarte?',
          },
        ],
        botOptions: {
          botTitle: 'Chatbot',
          colorScheme: '#1b53d0',
          inputPlaceholder: 'Escribe un mensaje...',
          avatar: botAvatar,
        },
      };
    },
    methods: {
      async messageSendHandler(value) {
        const userMessage = value.text;
  
        this.data.push({
          agent: 'user',
          type: 'text',
          text: userMessage,
        });
  
        this.botResponse(userMessage); // Pasa el mensaje del usuario a la función
      },
      async botResponse(userMessage) {
        try {
          const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: userMessage }),
          });
  
          const data = await response.json();
  
          if (data.respuesta && data.respuesta.length > 0) {
            this.data.push({
              agent: 'bot',
              type: 'text',
              text: data.respuesta[0], // Usa 'respuesta' en lugar de 'response'
            });
          } else {
            this.data.push({
              agent: 'bot',
              type: 'text',
              text: 'Lo siento, no tengo una respuesta para eso.',
            });
          }
        } catch (error) {
          console.error('Error al obtener la respuesta del bot:', error);
          this.data.push({
            agent: 'bot',
            type: 'text',
            text: 'Lo siento, ocurrió un error al procesar tu pregunta.',
          });
        }
      },
    },
  };
  </script>
  <!-- Aqui los estilos-->
  <style scoped>
  .qkb-msg-avatar__img {
    background-image: url('../assets/blogPhotos/1.jpg') !important; 
    background-size: cover; 
  }
  </style>
  