const hobbyContent = {
    title: 'Моє хобі - рукоділля',
    classTitle: 'Класова компонента',
    functionTitle: 'Функціональна компонента',
    paragraphs: [
        'Рукоділля для мене - це спосіб створювати затишок власними руками. У кожній роботі поєднуються уважність, терпіння і бажання зробити звичайну річ особливою.',
        'Мені подобається працювати з кольорами, фактурами та дрібними деталями. Завдяки рукоділлю можна виготовляти прикраси, декор, подарунки і речі, які мають особисту історію.',
    ],
};

const workImages = [
    {
        src: '../images/works/photo_2026-06-15_13-01-50.jpg',
        title: 'Робота 1',
    },
    {
        src: '../images/works/photo_2026-06-15_13-02-12.jpg',
        title: 'Робота 2',
    },
    {
        src: '../images/works/photo_2026-06-15_13-02-16.jpg',
        title: 'Робота 3',
    },
    {
        src: '../images/works/photo_2026-06-15_13-02-20.jpg',
        title: 'Робота 4',
    },
];

function FunctionalHobby({ title, paragraphs }) {
    return React.createElement(
        'article',
        { className: 'content-card' },
        React.createElement('h2', null, title),
        paragraphs.map((text, index) => React.createElement('p', { key: index }, text))
    );
}

class ClassHobby extends React.Component {
    render() {
        const { title, paragraphs } = this.props;

        return React.createElement(
            'article',
            { className: 'content-card' },
            React.createElement('h2', null, title),
            paragraphs.map((text, index) => React.createElement('p', { key: index }, text))
        );
    }
}

function WorksGallery({ images }) {
    return React.createElement(
        'section',
        { className: 'gallery-section' },
        React.createElement('h2', null, 'Приклади моїх робіт'),
        React.createElement(
            'div',
            { className: 'works-gallery' },
            images.map((image) => React.createElement(
                'figure',
                { className: 'work-card', key: image.src },
                React.createElement('img', {
                    src: image.src,
                    alt: image.title,
                }),
                React.createElement('figcaption', null, image.title)
            ))
        )
    );
}

function App() {
    return React.createElement(
        'main',
        { className: 'page' },
        React.createElement(
            'section',
            { className: 'hobby-panel' },
            React.createElement('p', { className: 'badge' }, 'React CDN'),
            React.createElement('h1', null, hobbyContent.title),
            React.createElement(
                'div',
                { className: 'content-grid' },
                React.createElement(ClassHobby, {
                    title: hobbyContent.classTitle,
                    paragraphs: hobbyContent.paragraphs,
                }),
                React.createElement(FunctionalHobby, {
                    title: hobbyContent.functionTitle,
                    paragraphs: hobbyContent.paragraphs,
                })
            ),
            React.createElement(WorksGallery, { images: workImages })
        )
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
