const database = require('../../../Database/Doctor/Availability/Delete');

const deleteAvailability = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    const doctorAvailabilityIds = req.body.slots_id;
    const deletedAvailabilities = [];

    let message = '';
    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(404).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    if (!doctorAvailabilityIds) {
        message = 'Availability IDs not found';
        return res.status(404).json(message);
    }
    for (const doctorAvailabilityId of doctorAvailabilityIds) {
        const doctorAvailabilityFlag = await database.checkDoctorAvailability(doctorId, doctorAvailabilityId);
        if (doctorAvailabilityFlag) {
            const availability = await database.deleteAvailability(doctorId, doctorAvailabilityId);
            if (availability) {
                console.log(`Availability of id ${doctorAvailabilityId} deleted successfully`);
                deletedAvailabilities.push(doctorAvailabilityId);
            }
            console.log(`Could not delete availability of id ${doctorAvailabilityId}`);
        }
        console.log(`Doctor availability of id ${doctorAvailabilityId} not found`);
    }
    if (deletedAvailabilities.length === 0) {
        message = 'Could not delete any availability';
        return res.status(400).json(message);
    }
    return res.json(`Successfully deleted ${deletedAvailabilities.length} availabilities from ${doctorAvailabilityIds.length}`);    
}

module.exports = { deleteAvailability };