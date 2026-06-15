import React, { Component } from 'react';

const hobbyContent = {
  title: 'Моє хобі - рукоділля',
  classTitle: 'Класова компонента',
  functionTitle: 'Функціональна компонента',
  paragraphs: [
    'Рукоділля для мене - це можливість створювати красиві речі власними руками та вкладати в них настрій, тепло і частинку характеру.',
    'У цьому хобі мені подобається уважність до деталей: добір кольорів, матеріалів, форми та невеликих декоративних елементів, які роблять роботу унікальною.',
  ],
};

const workImages = [
  {
    src: `${process.env.PUBLIC_URL}/images/works/photo_2026-06-15_13-01-50.jpg`,
    title: 'Робота 1',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/works/photo_2026-06-15_13-02-12.jpg`,
    title: 'Робота 2',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/works/photo_2026-06-15_13-02-16.jpg`,
    title: 'Робота 3',
  },
  {
    src: `${process.env.PUBLIC_URL}/images/works/photo_2026-06-15_13-02-20.jpg`,
    title: 'Робота 4',
  },
];

class ClassHobby extends Component {
  render() {
    const { title, paragraphs } = this.props;

    return (
      <article className="content-card">
        <h2>{title}</h2>
        {paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </article>
    );
  }
}

function FunctionalHobby({ title, paragraphs }) {
  return (
    <article className="content-card">
      <h2>{title}</h2>
      {paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </article>
  );
}

function WorksGallery({ images }) {
  return (
    <section className="gallery-section">
      <h2>Приклади моїх робіт</h2>
      <div className="works-gallery">
        {images.map((image) => (
          <figure className="work-card" key={image.src}>
            <img src={image.src} alt={image.title} />
            <figcaption>{image.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="page">
      <section className="hobby-panel">
        <p className="badge">React CRA</p>
        <h1>{hobbyContent.title}</h1>

        <div className="content-grid">
          <ClassHobby
            title={hobbyContent.classTitle}
            paragraphs={hobbyContent.paragraphs}
          />
          <FunctionalHobby
            title={hobbyContent.functionTitle}
            paragraphs={hobbyContent.paragraphs}
          />
        </div>

        <WorksGallery images={workImages} />
      </section>
    </main>
  );
}
