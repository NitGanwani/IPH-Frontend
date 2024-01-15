import { SyntheticEvent, useEffect, useState } from 'react';
import { useTerminals } from '../../hooks/use.terminals';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../form/form';
import { Col, Row, Form, Button } from 'react-bootstrap';

export default function TerminalForm() {
  const navigate = useNavigate();
  const {
    handleCreateTerminal,
    handleUpdateTerminal,
    terminals,
    handleLoadTerminals,
  } = useTerminals();
  const { id } = useParams();

  const [terminalData, setTerminalData] = useState({
    name: '',
    battery: '0',
    wifiLevel: 'low',
    isConnected: 'yes',
    group: '',
  });

  useEffect(() => {
    if (id) {
      const existingTerminal = terminals.find((terminal) => terminal.id === id);
      if (!existingTerminal) {
        handleLoadTerminals();
      }

      if (existingTerminal) {
        setTerminalData({
          name: existingTerminal.name,
          battery: existingTerminal.battery.toString(),
          wifiLevel: existingTerminal.wifi,
          isConnected: existingTerminal.isConnected ? 'yes' : 'no',
          group: existingTerminal.group.id,
        });
      }
    }
  }, [id, terminals, handleLoadTerminals]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (id) {
      await handleUpdateTerminal(
        id,
        new FormData(event.target as HTMLFormElement)
      );
    } else {
      await handleCreateTerminal(new FormData(event.target as HTMLFormElement));
    }

    navigate('/dashboard');
  };

  return (
    <FormContainer>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form
            aria-label="form"
            className="terminal-form"
            id="terminal-form"
            onSubmit={handleSubmit}
          >
            {id ? (
              <h2 className="title-form">Edit</h2>
            ) : (
              <h2 className="title-form">Add</h2>
            )}
            <h3>SPECIFICATIONS</h3>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. iphone3"
                name="name"
                value={terminalData.name}
                onChange={(e) =>
                  setTerminalData({ ...terminalData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="battery">
              <Form.Label>Battery:</Form.Label>
              <Form.Control
                as="select"
                name="battery"
                value={terminalData.battery}
                onChange={(e) =>
                  setTerminalData({ ...terminalData, battery: e.target.value })
                }
              >
                {[...Array(101).keys()].map((value) => (
                  <option key={value} value={value}>
                    {value}%
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="wifiLevel">
              <Form.Label>Wifi Level:</Form.Label>
              <Form.Control
                as="select"
                name="wifiLevel"
                value={terminalData.wifiLevel}
                onChange={(e) =>
                  setTerminalData({
                    ...terminalData,
                    wifiLevel: e.target.value,
                  })
                }
              >
                <option value="low">Low</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="isConnected">
              <Form.Label>Is Connected:</Form.Label>
              <Form.Control
                as="select"
                name="isConnected"
                value={terminalData.isConnected}
                onChange={(e) =>
                  setTerminalData({
                    ...terminalData,
                    isConnected: e.target.value,
                  })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit">{id ? 'Save Changes' : 'Submit'}</Button>
          </Form>
        </Col>
      </Row>
    </FormContainer>
  );
}
