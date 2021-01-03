const { Cherish, Plant } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');

module.exports = {
    /**
     * body: name, nickname, birth, phone, cycle_date, notice_time
     */
    createPlant: async (req, res) => {
        const { name, nickname, birth, phone, cycle_date, notice_time } = req.body;
        try {
            if(!name || !nickname || !birth || !phone || !cycle_date || !notice_time ){
                console.log('필요한 값이 없습니다.')
                return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE))
            }
            const PlantId = 1; //식물 추천해주는 알고리즘 넣으면 대체
            const UserId = 1;
            const cherish = await Cherish.create({
                name,
                nickname,
                birth,
                phone,
                cycle_date,
                notice_time,
                PlantId,
                UserId
            });
            const plant = await Plant.findOne({
                id: PlantId,
                attributes: ['name', 'explanation', 'thumbnail_image_url']
            })
            return res.status(sc.OK).send(ut.success(rm.OK, {nickname, plant} ));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR)
                .send(ut.fail(rm.INTERNAL_SERVER_ERROR));
        }
    }
}