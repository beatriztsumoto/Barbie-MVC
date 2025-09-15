import dados from "../models/dados.js";
const { barbies } = dados;

const getAllBarbies = ( req, res ) => {
    const resultado = barbies;

    res.status(200).json({
        total: resultado.length,
        barbies: resultado
    })
};

const getBarbiesById = (req, res) => {
    let id = parseInt(req.params.id);

    const barbie = barbies.find(b => b.id === id);

    res.status(200).json({
        success:true,
        barbie: barbie
    })
};

const createBarbie = (req, res) => {
    const { nome, profissao, anoLancamento} = req.body;

    if(!nome || !profissao){
        return res.status(400).json({
            success: false, 
            message: "Nome e profissão são obrigatorios!"
        });
    }

    const novaBarbie = {
        id: barbies.length + 1,
        nome: nome,
        profissao: profissao,
        anoLancamento: anoLancamento
    }

    barbies.push(novaBarbie);

    res.status(201).json({
        success: true,
        message: "Barbie cadastrada com sucesso!",
        barbie: novaBarbie
    })
};

const deleteBarbie = (req, res) => {
    let id =parseInt(req.params.id);

    const barbieParaRemover = barbies.find(b => b.id === id); 

    if(!barbieParaRemover) {
        return res.status(404).json({
            success: false,
            message: "Essa barbie não existe"
        })
    }

    const barbiesFiltradas = barbies.filter(barbie => barbie.id != id);

    barbies.splice(0, barbies.length, ...barbiesFiltradas);

    res.status(200).json({
        success: true,
        message: "A barbie foi removida com sucesso",
        barbieRemovida: barbieParaRemover
    })

};

const updateBarbie = (req,res) => {
    //toda a minha logica para atualizar uma barbie especifica
    const id = parseInt(req.params.id);
    //body para pegar os dados novos
    const {nome, profissao, anoLancamento} = req.body;

    const idPraEditar = id;

    //verificar se o id é valido!
    if(isNaN(idPraEditar)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser um numero valido!!!"
        })
    }

    //verificar se a barbie/id que eu estou buscando existe!!
    const barbieExiste = barbies.find(barbie => barbie.id === idPraEditar);

    if(!barbieExiste) {
        return res.status(404).json({
            success: false,
            message:`Barbie com id: ${id} não existe.`
        })
    }

    //Após passar todos os cenarios, eu atualizo a barbie.


    //Laço é o map

    const barbiesAtualizadas = barbies.map(barbie => barbie.id === idPraEditar ? {
        ...barbie,
        ...(nome && {nome}),
        ...(profissao && {profissao}),
        ...(anoLancamento && {anoLancamento: parseInt(anoLancamento)})
    } : barbie)

    // Atualizando o array com splice
    barbies.splice(0, barbies.length, ...barbiesAtualizadas);

    const barbieNova = barbies.find(barbie => barbie.id === idPraEditar);

    res.status(200).json({
        success: true,
        message: `Dados da Barbie ID ${idPraEditar} atualizadas com sucesso!`,
        barbie: barbieNova
    })

}
export{ getAllBarbies, getBarbiesById, createBarbie, deleteBarbie, updateBarbie };