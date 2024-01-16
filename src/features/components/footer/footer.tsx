import { Col, Container, Row } from 'react-bootstrap';
import style from './footer.module.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={style.footer}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Nitin Ganwani &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
