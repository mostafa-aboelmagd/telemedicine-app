import React from 'react'
import { MdDownload } from "react-icons/md";

const DocumentComponent = ({ document, icon }: { document: any, icon: any }) => {
    const handleOpenDocument = () => {
        if (document.url) {
            window.open(document.url, '_blank', 'noopener,noreferrer');
        } else {
            alert("Document URL not available");
        }
    }
    const handleDownloadDocument = () => {
        // to be added later
    }
    return (
        <div className='bg-gray-100 rounded-3xl p-4 flex justify-between items-center'>
            <div onClick={handleOpenDocument} className='flex space-x-4 items-center cursor-pointer hover:scale-110 transition'>
                <div className='bg-white rounded-full object-cover shadow-lg'>{icon}</div>
                <p className='font-semibold text-[#035fe9]'>{document.name}</p>
            </div>
            <div onClick={handleDownloadDocument}>
                <MdDownload className='cursor-pointer bg-transparent h-10 w-10 rounded-full p-2 text-[#035fe9] hover:bg-gray-200 hover:scale-110 transition' />
            </div>
        </div>
    )
}

export default DocumentComponent