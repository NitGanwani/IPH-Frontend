import { SyntheticEvent, useEffect, useState } from 'react';
import { useTerminals } from '../../hooks/use.terminals';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../form/form';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useGroups } from '../../hooks/use.groups';
import { Terminal } from '../../models/terminal';

export default function TerminalForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    handleCreateTerminal,
    handleUpdateTerminal,
    handleLoadTerminals,
    terminals,
  } = useTerminals();

  const { groups, handleLoadGroups } = useGroups();

  const [terminalData, setTerminalData] = useState({
    name: '',
    battery: '0',
    wifi: 'low',
    isConnected: 'yes',
    group: '',
  });

  useEffect(() => {
    handleLoadGroups();
  }, []);

  useEffect(() => {
    if (id) {
      const existingTerminal: Terminal = terminals.find(
        (terminal) => terminal.id === id
      ) as Terminal;
      if (!existingTerminal) {
        handleLoadTerminals();
      }

      if (existingTerminal) {
        const form = document.querySelector(
          '.terminal-form'
        ) as HTMLFormElement;
        (form.elements.namedItem('name') as HTMLInputElement).value =
          existingTerminal.name;
        (form.elements.namedItem('battery') as HTMLSelectElement).value =
          existingTerminal.battery.toString();
        (form.elements.namedItem('wifi') as HTMLSelectElement).value =
          existingTerminal.wifi;
        (form.elements.namedItem('isConnected') as HTMLSelectElement).value =
          existingTerminal.isConnected;
        (form.elements.namedItem('group') as HTMLSelectElement).value =
          existingTerminal.group.name;
      }
    }
  }, [id, terminals, handleLoadTerminals]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const terminalForm = event.target as HTMLFormElement;

    const terminalData = new FormData(terminalForm);

    if (id) {
      await handleUpdateTerminal(id, terminalData);
    } else {
      await handleCreateTerminal(terminalData);
    }

    navigate('/dashboard');
    terminalForm.reset();
  };

  return (
    <>
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
                <h2 className="title-form text-center m-2">Edit Terminal</h2>
              ) : (
                <h2 className="title-form text-center m-2">Create Terminal</h2>
              )}
              <h3 className="text-center m-2">SPECIFICATIONS</h3>
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
                    setTerminalData({
                      ...terminalData,
                      battery: e.target.value,
                    })
                  }
                >
                  {[...Array(101).keys()].map((value) => (
                    <option key={value} value={value}>
                      {value}%
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="wifi">
                <Form.Label>Wifi Level:</Form.Label>
                <Form.Control
                  as="select"
                  name="wifi"
                  value={terminalData.wifi}
                  onChange={(e) =>
                    setTerminalData({
                      ...terminalData,
                      wifi: e.target.value,
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
              <Form.Group controlId="group">
                <Form.Label>Choose your group:</Form.Label>
                <Form.Control
                  as="select"
                  name="group"
                  value={terminalData.group}
                  onChange={(e) =>
                    setTerminalData({ ...terminalData, group: e.target.value })
                  }
                >
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <div className="d-flex justify-content-center mt-2">
                <Button type="submit" className="my-3 mx-2">
                  {id ? 'Save Changes' : 'Submit'}
                </Button>
                <Link to="/dashboard" className="btn btn-dark my-3 mx-2">
                  Go Back
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
}
