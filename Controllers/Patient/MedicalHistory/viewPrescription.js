

const MedicalHistory = require('../../../Database/Patient/MedicalHistory/viewPrescription');
const { validatePrescriptionData } = require('../../../Utilities');

const getPrescription = async (req, res) => {
  // const patientId = req.body.patientId;
  const patientId = 22;

  try {
    const prescription = await MedicalHistory.retrievePrescription(patientId);
    if (!prescription) {
      return res.status(404).json({ message: 'No prescription found for this patient' });
    }
    return res.json(prescription);
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {getPrescription};






