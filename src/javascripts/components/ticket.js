// TICKET COMPONENT
// How each ticket will appear in the sidebar
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { DEFAULT_THEME, PALETTE } from '@zendeskgarden/react-theming'

import React,
{
    useState,
    useEffect
} from "react";

const TicketComponent = (props) => {
    const [ticket, setTicket] = useState({}); // store ticket object
    const [isHover, setHover] = useState(false);

    useEffect(() => {
        setTicket(props.ticket)
        // console.log(props.ticket);
    });

    const MouseOver = () => {
        setHover(true);
    }
    const MouseOut = () => {
        setHover(false);
    }

    const redirect = (id) => {
        const path = `/tickets/${id}`
        //window only refers to sidebar app viewport -- not sure how to redirect page yet;
    }

    const styles = {
        wrapper: {
            border: DEFAULT_THEME.borders.sm,
            borderRadius: DEFAULT_THEME.borderRadii.md,
            borderColor: PALETTE.grey[300],
            margin: '5px 0px',
            width: '100%',
        },
        hover: {
            border: DEFAULT_THEME.borders.sm,
            borderRadius: DEFAULT_THEME.borderRadii.md,
            borderColor: PALETTE.azure[600],
            margin: '5px 0px',
            width: '100%',
            backgroundColor: PALETTE.grey[200],
            transition: '0.5s'
        },
        ellipsis: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        },
        padding: {
            padding: '2px 0px'
        }
    }

    return (
        <div className="ticket-wrapper" 
        style={isHover? styles.hover : styles.wrapper} 
        onMouseOver={MouseOver}
        onMouseOut={MouseOut}
        onClick={() => redirect(ticket.id)}
        >
            <Tooltip placement="start-top" content="Click to view ticket page">
                <Grid>
                    <Row style={styles.padding}>
                        <Col style={styles.ellipsis}>
                        <b>ID:</b> {ticket.id}
                        </Col>
                        <Col style={styles.ellipsis}>
                        <b>Priority:</b> {ticket.priority}
                        </Col>
                    </Row>
                    <Row style={styles.padding}>
                        <Col style={styles.ellipsis}>
                        <b>Subject:</b> {ticket.subject}
                        </Col>
                    </Row>
                    <Row style={styles.padding}>
                        <Col>
                        <b>Requested:</b> {ticket.created_at}
                        </Col>
                        <Col>
                        <b>Updated:</b> {ticket.updated_at}
                        </Col>
                    </Row>
                    <Row style={styles.padding}>
                        <Col style={styles.ellipsis}>
                        <b>Assignee:</b>
                        </Col>
                        
                    </Row>
                
                </Grid>
            </Tooltip>
        </div>
    )
}

export default TicketComponent