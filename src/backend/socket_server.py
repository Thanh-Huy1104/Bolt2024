import socketio

sio = socketio.AsyncServer(async_mode='asgi')
app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):
    print('connect ', sid)  

@sio.event
async def message(sid, data):
    print('message ', data)
    await sio.emit('reply', room=sid)

@sio.event
async def disconnect(sid):
    print('disconnect ', sid)