import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import './ViewPDF.css';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};

export default function ViewPDF() {
    const [file, setFile] = useState('../pdfs/outline-2020.pdf');
    const [numPages, setNumPages] = useState(null);

    function onFileChange(event) {
        setFile(event.target.files[0]);
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    return (
        <div className="Example">
        <header>
            <h1>react-pdf sample page</h1>
        </header>
        <div className="Example__container">
            <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>{' '}
            <input onChange={onFileChange} type="file" />
            </div>
            <div className="Example__container__document">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
            </div>
        </div>
        </div>
    );
}