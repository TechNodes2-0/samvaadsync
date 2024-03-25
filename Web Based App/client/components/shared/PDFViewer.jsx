import React from 'react';

function PdfPreviewUpload({ previewUrl }) {

  return (
    <div>
      {previewUrl && (
        <iframe
          src={previewUrl}
          frameBorder="0"
          scrolling="no"
          width="400"
          height="600"
        ></iframe>
      )}
    </div>
  );
}

export default PdfPreviewUpload;
