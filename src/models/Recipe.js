const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // rate:{
    //   type: DataTypes.INTEGER,
    //   validate:{
    //     min:0,
    //     max:100
    //   },
    // },
    healthy:{
      type: DataTypes.INTEGER,
      validate:{
        min:0,
        max:100
      },
    },
    instructions:{
      type: DataTypes.TEXT
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: "https://us.123rf.com/450wm/belchonock/belchonock1906/belchonock190602030/124303341-mujer-con-plato-vac%C3%ADo-en-la-mesa-de-madera-vista-superior.jpg?ver=6"
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
      allowNull: false
    }
  },
  {createdAt: false,
    updatedAt: false}
  );
};
