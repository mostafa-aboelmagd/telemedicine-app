import { table } from 'console'
import React from 'react'

const MedicationTable = ({ medicationList }: { medicationList: any[] }) => {
    return (
        <table className='border w-full text-xs md:text-base lg:text-lg'>
            <thead>
                <tr>
                    <th className='p-2'>Name</th>
                    <th className='p-2'>Dosage</th>
                    <th className='p-2'>Frequency</th>
                    <th className='p-2'>Start Date</th>
                    <th className='p-2'>End Date</th>
                    <th className='p-2'>Doctor's Notes</th>
                </tr>
            </thead>
            <tbody className='border'>
                {medicationList.map((medication) => (
                    <tr className='border text-center' key={medication.id}>
                        <td className='border p-2'>{medication.name}</td>
                        <td className='border p-2'>{medication.dose}</td>
                        <td className='border p-2'>{medication.frequency}</td>
                        <td className='border p-2'>{medication.start}</td>
                        <td className='border p-2'>{medication.end}</td>
                        <td className='border p-2'>{medication.notes}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MedicationTable