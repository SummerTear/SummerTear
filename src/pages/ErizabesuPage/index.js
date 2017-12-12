import { h } from 'preact';
import Erizabesu from 'erizabesu';
import { Simple } from 'erizabesu-indicators';
import styles from './style';

const data = [
  {
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide1.png',

    href: 'https://summertear.com/opensource/erizabesu',
    target: '_blank'
  },
  {
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide2.png',
    href: 'https://summertear.com/opensource/erizabesu',
    target: '_blank'
  },
  {
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide3.png',
    href: 'https://summertear.com/opensource/erizabesu',
    target: '_blank'
  },
  {
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide4.png',
    href: 'https://summertear.com/opensource/erizabesu',
    target: '_blank'
  },
  {
    img: 'http://oyb6x67aa.bkt.clouddn.com/slide5.png',
    href: 'https://summertear.com/opensource/erizabesu',
    target: '_blank'
  }
];

const ErizabesuPage = () => (
  <Erizabesu class={styles.erizabesu} indicator={Simple} data={data} />
);

export default ErizabesuPage;
