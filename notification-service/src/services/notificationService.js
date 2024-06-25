require("dotenv").config({path:".env"})
const kafka = require('../messaging/kafka/index');
const axios = require('axios');
const sendEmail = require('../repositories/mailerRepository');

const getUserEmail = async (responsavelId) => {
    try {
        const response = await axios.get(
            `http://localhost:${process.env.RESPONSAVEL_SERVICE_PORT}/responsaveis`,
            { params: { id_responsavel: responsavelId } }
        );
        if (response.data.dados && response.data.dados.length > 0) {
            return response.data.dados[0].email;
        } else {
            console.error(`No data found for user ID ${responsavelId}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching user with ID ${responsavelId}:`, error.message);
        return null;
    }
};

const handleMessage = async ({ topic, partition, message }) => {
    try {
        const { id_tarefa, responsavelId, titulo, descricao } = JSON.parse(message.value.toString());
        const userEmail = await getUserEmail(responsavelId);
        
        if (userEmail) {
            const emailSubject = 'New Task Created';
            const emailText = `Task ID: ${id_tarefa}\nTitle: ${titulo}\nDescription: ${descricao}`;
            await sendEmail(userEmail, emailSubject, emailText);
        } else {
            console.error(`User with ID ${responsavelId} not found`);
        }
    } catch (error) {
        console.error('Error processing message:', error.message);
    }
};

const run = async () => {
    const consumer = kafka.consumer({ groupId: 'notification-group' });
  
    await consumer.connect();
    await consumer.subscribe({ topic: 'task-topic', fromBeginning: true });
  
    await consumer.run({
      eachMessage: handleMessage,
    });
  
    console.log('Kafka consumer is running...');
};

module.exports = run;