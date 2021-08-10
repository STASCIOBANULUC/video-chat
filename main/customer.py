import json
from channels.generic.websocket import AsyncWebsocketConsumer


class Chat_Customer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = 'Test Room'

        await self.channel_layer.groop_add(

            self.room_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.groop_discard(

            self.room_name,
            self.channel_name

        )
        print("DISCONNECTED!")

    async def receive(self, text_data):
        receive_dict = json.loads(text_data)
        message = receive_dict['message']

        await self.channel_layer.groop_send(
            {
                'type': 'send.massage',
                'message': message

            }
        )

    async def send_message(self, event):
        message = event['message']
        await self.send(text_data=json.loads({'message': message}))





