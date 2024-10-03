const map = async (finalData) => {
  const mappedData = {
    personalInfo: {
      firstName: finalData.personalInfo.Fname,
      lastName: finalData.personalInfo.Lname,
      birthdate: finalData.personalInfo.birthdate,
      city: finalData.personalInfo.city,
      country: finalData.personalInfo.country,
      email: finalData.personalInfo.email,
      gender: finalData.personalInfo.gender,
      location: finalData.personalInfo.location,
      password: finalData.personalInfo.password,
      phone: finalData.personalInfo.phone,
      speciality: finalData.personalInfo.speciality,
    },
    certificates: finalData.certificates.map((certificate) => ({
      authority: certificate.authority,
      endDate: certificate.endDate,
      name: certificate.name,
      startDate: certificate.startDate,
    })),
    experiences: finalData.experiences.map((experience) => ({
      department: experience.department,
      endDate: experience.endDate,
      firm: experience.firm,
      startDate: experience.startDate,
      title: experience.title,
    })),
    interests: finalData.interests.map((interest) => ({
      category: interest.category,
      name: interest.name,
    })),
    Languages: finalData.selectedLanguages,
  };
 
  return mappedData;
};

export default map;
