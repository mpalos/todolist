
const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timeStamps = require('mongoose-timestamp'); // Cria automaticamente os campos createdAt e UpdatedAt

/**
 * Schema do banco
 */
const TodoSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pendente', 'finalizado', 'em progresso', 'atrasado'],
            default: 'pendente',
        },
    },

    { minimize: false}

);

TodoSchema.plugin(timeStamps);
TodoSchema.plugin(mongooseStringQuery);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;