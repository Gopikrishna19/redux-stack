import Server from 'socket.io';

function serveState(socket, store) {

  return socket.emit('state', store.getState());

}

export default function startServer(store) {

  const io = new Server().attach(8090);

  store.subscribe(() => serveState(io, store));

  io.on('connection', socket => {

    serveState(socket, store);
    socket.on('action', store.dispatch.bind(store));

  });

}
