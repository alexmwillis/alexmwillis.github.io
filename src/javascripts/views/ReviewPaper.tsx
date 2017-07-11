import * as React from "react";
import { Button, Glyphicon } from 'react-bootstrap'

const ReviewPaper = ({reviewPaper} : {reviewPaper : ()=>void}) => {  
    return <div>
            <Button block onClick={e => reviewPaper()}>
                <Glyphicon glyph='thumbs-up'/>
            </Button>
        </div>
}

export default ReviewPaper
