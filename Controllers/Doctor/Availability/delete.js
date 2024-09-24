const database = require('../../../Database/Doctor/Availability/Delete');

const deleteAvailability = async (req, res) => {
    try {
        const appointmentIds = req.body.appointmentIds;
    
        if (!appointmentIds || appointmentIds.length === 0) {
        return res.status(400).json({ message: "No appointment IDs provided" });
        }
    
        const deletedAppointmentIds = [];
        const failedAppointmentIds = [];
    
        // Loop through appointment IDs and delete one by one
        for (const appointmentId of appointmentIds) {
        try {
            await database.deleteAppointment(appointmentId);
            deletedAppointmentIds.push(appointmentId);
        } catch (error) {
            if (error.code === '23503') { // Assuming PostgreSQL's error code for foreign key violation
            failedAppointmentIds.push(appointmentId);
            } else {
            console.error(`Error deleting appointment ${appointmentId}:`, error);
            failedAppointmentIds.push(appointmentId);
            }
        }
        }
    
        const response = {
        deleted: deletedAppointmentIds,
        failed: failedAppointmentIds,
        message: "Appointments deleted successfully."
        };
    
        if (failedAppointmentIds.length > 0) {
        response.message = "Some appointments could not be deleted.";
        }
    
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting appointments" });
    }
    };
module.exports = { deleteAvailability };