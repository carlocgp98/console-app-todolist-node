require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
        inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
    }
     = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ){ //cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        // Imprimir el menú
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput( 'Descripcion: ' );
                tareas.crearTarea( desc )
                guardarDB(tareas.listadoArr);
            break;
            case '2': //Listado de tarea
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4': //Listar Pendientes
                tareas.listarPendientesCompletadas(false);
            break;
            case '5': //Completar Tareas
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
            break;
            case '6': //Borrar Tareas
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !=='0' ){
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada correctamente.');
                    }
                }
                
            break;
        }

        // guardarDB( tareas.listadoArr );

        await pausa();

    } while (opt !== '0');
    //pausa();
};

main();
