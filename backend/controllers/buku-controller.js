const bukuModel = require(`../models/index`).buku
const upload = require(`./upload-buku`)
const path = require(`path`)
const fs = require(`fs`)
const joi = require(`joi`)
const { Op } = require("sequelize")

const validateBuku = (input) => {
    let rules = joi.object().keys({
        judul: joi
            .string()
            .required(),
        deskripsi: joi
            .string()
            .required(),
        link: joi
            .string()
            .required(),
    })
    let { error } = rules.validate(input)
    if (error) {
        let message = error
            .details
            .map(item => item.message)
            .join(`,`)

        return {
            status: false,
            message: message
        }
    }
    return {
        status: true
    }
}

exports.addBuku = async (request, response) => {
    try {
        const uploadBuku = upload.single(`gambar`)
        uploadBuku(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }
            if (!request.file) {
                return response.json({
                    status: false,
                    message: `Nothing file to upload`
                })
            }

            let resultValidation = validateBuku(request.body)
            if (resultValidation.status === false) {
                return response.json({
                    status: false,
                    message: resultValidation.message
                })
            }

            request.body.gambar = request.file.filename

            await bukuModel.create(request.body)
            return response.json({
                status: true,
                message: `Data buku berhasil ditambahkan`
            })
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.getBuku = async (request, response) => {
    try {
        let result = await bukuModel.findAll()
        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

exports.filterBuku = async (request, response) => {
    try {
        let keyword = request.body.keyword
        let result = await bukuModel.findAll({
            where: {
                [Op.or]: {
                    nama_baju: { [Op.substring]: keyword },
                    jenis: { [Op.substring]: keyword },
                    deskripsi: { [Op.substring]: keyword }
                }
            }
        })
        return response.json({
            status: true,       
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.updateBuku = async (request, response) => {
    try {
        const uploadBuku = upload.single(`gambar`)
        uploadBuku(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }
            let id_buku = request.params.id_buku
            let selectedBuku = await bukuModel.findOne({ where: { id_buku: id_buku } })
            if (request.file) {
                let oldFilename = selectedBuku.gambar
                let pathFile = path.join(__dirname, `../cover-image`, oldFilename)
                if (fs.existsSync(pathFile)) {
                    fs.unlinkSync(pathFile, error => { console.log(error) })
                }
                request.body.gambar = request.file.filename
            }
            await bukuModel.update(request.body, { where: { id_buku: id_buku } })
            return response.json({
                status: true,
                message: `Data menu berhasil diubah`
            })
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.deleteBuku = async (request, response) => {
    try {
        let id_buku = request.params.id_buku
        let selectedBuku = await bukuModel.findOne({ where: { id_buku: id_buku } })
        let pathFile = path.join(__dirname, `../cover-image`, selectedBuku.gambar)
        if (fs.existsSync(pathFile)) {
            fs.unlinkSync(pathFile, error => { console.log(error) })
        }
        await bukuModel.destroy({ where: { id_buku: id_buku } })
        return response.json({
            status: true,
            message: `Data buku berhasil dihapus`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}