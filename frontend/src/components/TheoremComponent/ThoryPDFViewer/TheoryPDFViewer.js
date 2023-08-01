import React, { useEffect, useState } from 'react'
import { SpecialZoomLevel, Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import packageJson from '../../../../package.json';
const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];

function TheoryPDFViewer({ TheoremAlgGeo, TheoryID }) {

    let PDF = null;
    if (TheoremAlgGeo === 'Algebra') {
        PDF = require('../../../assets/theorems/algebra/algebra-' + TheoryID + '.pdf');
    }
    else if (TheoremAlgGeo === 'Geometry') {
        PDF = require('../../../assets/theorems/geometry/geometry-' + TheoryID + '.pdf');
    }
    else {
        PDF = require('../../../assets/theorems/thesis/thesis-' + TheoryID + '.pdf');
    }

    return (
        <div className='TheoryPDF'>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                <Viewer className='Problem-PDFViewer' defaultScale={SpecialZoomLevel.PageWidth} fileUrl={PDF} />
            </Worker >
        </div>
    )
}

export default TheoryPDFViewer