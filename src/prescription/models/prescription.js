module.exports = (sequelize, DataTypes) => {
  const prescription = sequelize.define('prescription', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    physician_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  }, {
    tableName: 'prescription'
  })

  return prescription
}
