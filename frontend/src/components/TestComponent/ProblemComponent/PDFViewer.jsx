import React, { useEffect, useState } from 'react'
import { SpecialZoomLevel, Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import './PDFViewer.scss';
import packageJson from '../../../../package.json';
const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];

console.log(pdfjsVersion);



export default function PDFViewer(props) {

    //GENERATING THE PDF
    let PDF = null;
    if (props.Problem.Version == 1) {
        PDF = require('../../../assets/' + props.Problem.Year + '/' + props.Problem.Version + "/I-" + (props.Problem.Problem + 1) + '.pdf');
    }
    else if (props.Problem.Version == 2) {
        PDF = require('../../../assets/' + props.Problem.Year + '/' + props.Problem.Version + "/II-" + (props.Problem.Problem + 1) + '.pdf');
    }
    else if (props.Problem.Version == 3) {
        PDF = require('../../../assets/' + props.Problem.Year + '/' + props.Problem.Version + "/III-" + (props.Problem.Problem + 1) + '.pdf');
    }


    return (
        <>
            <div id={props.id} className='Problem'>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                    <Viewer className='Problem-PDFViewer' defaultScale={SpecialZoomLevel.PageWidth} fileUrl={PDF} />
                </Worker >
            </div>
        </>
    )
}
