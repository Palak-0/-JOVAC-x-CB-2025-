// Sample blog data (20 articles)
const blogData = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        excerpt: "Learn how to use React Hooks to manage state and side effects in functional components. This comprehensive guide covers useState, useEffect, and custom hooks.",
        content: "React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components. In this comprehensive guide, we'll explore the most commonly used hooks and learn how to create custom hooks for reusable logic. useState allows us to add state to functional components, while useEffect handles side effects like API calls, subscriptions, and DOM manipulation. Custom hooks enable us to extract component logic into reusable functions that can be shared across multiple components.",
        author: "John Doe",
        date: "2024-03-15",
        category: "React",
        readTime: "5 min read",
        tags: ["React", "Hooks", "JavaScript", "Frontend"]
    },
    {
        id: 2,
        title: "Advanced CSS Grid Techniques",
        excerpt: "Master CSS Grid with advanced techniques for creating complex layouts. Explore grid areas, auto-placement, and responsive design patterns.",
        content: "CSS Grid is a powerful two-dimensional layout system that has revolutionized web design. This article explores advanced techniques including named grid lines, grid areas, auto-placement algorithms, and creating responsive layouts without media queries. We'll also cover subgrid, grid template areas, and how to create complex magazine-style layouts with ease.",
        author: "Jane Smith",
        date: "2024-03-12",
        category: "CSS",
        readTime: "7 min read",
        tags: ["CSS", "Grid", "Layout", "Responsive Design"]
    },
    {
        id: 3,
        title: "JavaScript ES2024 New Features",
        excerpt: "Discover the latest JavaScript features in ES2024 including new array methods, temporal API, and pattern matching capabilities.",
        content: "JavaScript ES2024 brings exciting new features that enhance developer productivity and code readability. This article covers the new array methods like findLast() and findLastIndex(), the Temporal API for better date/time handling, and the proposed pattern matching syntax. We'll also explore improvements to decorators, pipeline operators, and new utility methods for working with data structures.",
        author: "Mike Johnson",
        date: "2024-03-10",
        category: "JavaScript",
        readTime: "6 min read",
        tags: ["JavaScript", "ES2024", "Features", "Programming"]
    },
    {
        id: 4,
        title: "Building RESTful APIs with Node.js",
        excerpt: "Complete guide to building robust RESTful APIs using Node.js and Express. Learn about routing, middleware, authentication, and best practices.",
        content: "Building RESTful APIs is a cornerstone skill for backend development. This comprehensive guide covers everything from setting up Express.js to implementing authentication, error handling, and data validation. We'll explore middleware patterns, database integration with MongoDB and PostgreSQL, API documentation with Swagger, and deployment strategies for production environments.",
        author: "Sarah Wilson",
        date: "2024-03-08",
        category: "Node.js",
        readTime: "10 min read",
        tags: ["Node.js", "Express", "API", "Backend"]
    },
    {
        id: 5,
        title: "Python for Data Science",
        excerpt: "Introduction to using Python for data science with pandas, numpy, and matplotlib. Learn data manipulation, analysis, and visualization techniques.",
        content: "Python has become the lingua franca of data science, offering powerful libraries for data manipulation, analysis, and visualization. This tutorial covers pandas for data manipulation, numpy for numerical computations, matplotlib and seaborn for visualization, and scikit-learn for machine learning. We'll work through real-world examples including data cleaning, exploratory data analysis, and building predictive models.",
        author: "David Brown",
        date: "2024-03-05",
        category: "Python",
        readTime: "8 min read",
        tags: ["Python", "Data Science", "Pandas", "Analytics"]
    },
    {
        id: 6,
        title: "Modern DevOps Practices",
        excerpt: "Explore modern DevOps practices including CI/CD pipelines, containerization with Docker, and infrastructure as code using Terraform.",
        content: "DevOps practices have transformed how we build, test, and deploy software. This article explores modern DevOps workflows including continuous integration and deployment, containerization strategies with Docker and Kubernetes, infrastructure as code using Terraform and Ansible, monitoring and logging with Prometheus and ELK stack, and implementing GitOps workflows for better collaboration between development and operations teams.",
        author: "Lisa Chen",
        date: "2024-03-02",
        category: "DevOps",
        readTime: "12 min read",
        tags: ["DevOps", "Docker", "CI/CD", "Infrastructure"]
    },
    {
        id: 7,
        title: "Vue.js 3 Composition API",
        excerpt: "Deep dive into Vue.js 3 Composition API. Learn how to organize logic, share code between components, and improve maintainability.",
        content: "Vue.js 3's Composition API provides a more flexible way to organize component logic. This guide explores reactive references, computed properties, watchers, and lifecycle hooks in the context of the Composition API. We'll learn how to create composable functions, share logic between components, and migrate from the Options API while maintaining backward compatibility.",
        author: "Alex Rodriguez",
        date: "2024-02-28",
        category: "Vue.js",
        readTime: "9 min read",
        tags: ["Vue.js", "Composition API", "Frontend", "JavaScript"]
    },
    {
        id: 8,
        title: "TypeScript Best Practices",
        excerpt: "Learn TypeScript best practices for large-scale applications. Covers advanced types, generics, decorators, and project configuration.",
        content: "TypeScript enhances JavaScript with static typing, making code more maintainable and less prone to runtime errors. This comprehensive guide covers advanced TypeScript concepts including utility types, conditional types, mapped types, and generic constraints. We'll also explore project configuration, strict mode settings, and integration with popular frameworks like React and Node.js.",
        author: "Emma Davis",
        date: "2024-02-25",
        category: "TypeScript",
        readTime: "11 min read",
        tags: ["TypeScript", "Types", "JavaScript", "Best Practices"]
    },
    {
        id: 9,
        title: "GraphQL vs REST APIs",
        excerpt: "Comprehensive comparison between GraphQL and REST APIs. Understand when to use each approach and their respective advantages.",
        content: "The choice between GraphQL and REST APIs depends on your specific use case and requirements. This article provides an in-depth comparison covering query flexibility, caching strategies, tooling ecosystem, and performance characteristics. We'll explore when to choose GraphQL for its type safety and efficient data fetching, and when REST might be more appropriate for simpler APIs and better caching support.",
        author: "Tom Anderson",
        date: "2024-02-22",
        category: "API",
        readTime: "7 min read",
        tags: ["GraphQL", "REST", "API", "Backend"]
    },
    {
        id: 10,
        title: "MongoDB Database Design",
        excerpt: "Learn MongoDB database design principles, schema patterns, indexing strategies, and performance optimization techniques.",
        content: "MongoDB's document-based approach requires different design patterns compared to relational databases. This guide covers schema design patterns, embedding vs referencing strategies, indexing for query optimization, aggregation pipeline techniques, and sharding for horizontal scaling. We'll also explore transactions in MongoDB and best practices for data modeling in NoSQL environments.",
        author: "Rachel Green",
        date: "2024-02-18",
        category: "Database",
        readTime: "13 min read",
        tags: ["MongoDB", "NoSQL", "Database", "Performance"]
    },
    {
        id: 11,
        title: "Next.js App Router Guide",
        excerpt: "Complete guide to Next.js App Router with server components, streaming, and parallel routes. Build faster, more efficient web applications.",
        content: "Next.js App Router represents a paradigm shift in React application architecture. This comprehensive guide explores server components, client components, streaming, suspense, and parallel routes. We'll learn how to implement nested layouts, loading states, error boundaries, and data fetching strategies that leverage the new architecture for improved performance and user experience.",
        author: "Chris Miller",
        date: "2024-02-15",
        category: "Next.js",
        readTime: "14 min read",
        tags: ["Next.js", "React", "Server Components", "Performance"]
    },
    {
        id: 12,
        title: "Web Security Fundamentals",
        excerpt: "Essential web security practices including HTTPS, CSRF protection, XSS prevention, and secure authentication implementation.",
        content: "Web security is crucial for protecting users and applications from malicious attacks. This guide covers fundamental security practices including HTTPS implementation, Cross-Site Request Forgery (CSRF) protection, Cross-Site Scripting (XSS) prevention, SQL injection mitigation, and secure authentication flows. We'll also explore security headers, content security policies, and penetration testing basics.",
        author: "Kevin Park",
        date: "2024-02-12",
        category: "Security",
        readTime: "10 min read",
        tags: ["Security", "Web", "Authentication", "HTTPS"]
    },
    {
        id: 13,
        title: "AWS Cloud Architecture",
        excerpt: "Design scalable cloud architectures using AWS services. Learn about EC2, S3, RDS, Lambda, and best practices for cloud deployment.",
        content: "Amazon Web Services provides a comprehensive suite of cloud services for building scalable applications. This guide explores core services including EC2 for compute, S3 for storage, RDS for databases, and Lambda for serverless computing. We'll design a multi-tier architecture, implement auto-scaling, set up load balancing, and establish monitoring and backup strategies for production workloads.",
        author: "Maria Garcia",
        date: "2024-02-08",
        category: "AWS",
        readTime: "15 min read",
        tags: ["AWS", "Cloud", "Architecture", "Scalability"]
    },
    {
        id: 14,
        title: "Machine Learning with TensorFlow",
        excerpt: "Introduction to machine learning using TensorFlow. Build neural networks, train models, and deploy ML applications in production.",
        content: "TensorFlow is Google's open-source machine learning framework that simplifies building and deploying ML models. This tutorial covers neural network fundamentals, building models with Keras, data preprocessing techniques, training optimization, and model evaluation. We'll also explore transfer learning, model deployment options, and monitoring ML models in production environments.",
        author: "James Wilson",
        date: "2024-02-05",
        category: "ML",
        readTime: "16 min read",
        tags: ["Machine Learning", "TensorFlow", "Neural Networks", "AI"]
    },
    {
        id: 15,
        title: "React Performance Optimization",
        excerpt: "Optimize React application performance with code splitting, lazy loading, memoization, and virtual DOM best practices.",
        content: "React performance optimization is crucial for delivering fast, responsive user experiences. This guide covers code splitting with React.lazy(), implementing memoization with React.memo() and useMemo(), optimizing re-renders with useCallback(), and profiling applications with React DevTools. We'll also explore bundle analysis, tree shaking, and strategies for handling large lists efficiently.",
        author: "Anna Thompson",
        date: "2024-02-01",
        category: "React",
        readTime: "8 min read",
        tags: ["React", "Performance", "Optimization", "Frontend"]
    },
    {
        id: 16,
        title: "Docker Container Orchestration",
        excerpt: "Master Docker container orchestration with Docker Compose and Kubernetes. Learn container networking, storage, and scaling strategies.",
        content: "Container orchestration simplifies deploying and managing containerized applications at scale. This comprehensive guide covers Docker Compose for local development, Kubernetes for production orchestration, container networking concepts, persistent storage solutions, and scaling strategies. We'll also explore service mesh architecture, monitoring containerized applications, and implementing CI/CD pipelines for containerized workloads.",
        author: "Robert Lee",
        date: "2024-01-28",
        category: "Docker",
        readTime: "12 min read",
        tags: ["Docker", "Kubernetes", "Containers", "Orchestration"]
    },
    {
        id: 17,
        title: "Progressive Web Apps (PWA)",
        excerpt: "Build Progressive Web Apps with service workers, offline capabilities, push notifications, and app-like user experiences.",
        content: "Progressive Web Apps combine the best of web and native mobile applications. This guide covers service workers for offline functionality, web app manifests for installability, push notifications for user engagement, and background sync for reliable data updates. We'll build a complete PWA with caching strategies, offline-first architecture, and native-like user interface patterns.",
        author: "Sophie Turner",
        date: "2024-01-25",
        category: "PWA",
        readTime: "9 min read",
        tags: ["PWA", "Service Workers", "Offline", "Mobile"]
    },
    {
        id: 18,
        title: "Git Workflow Strategies",
        excerpt: "Explore different Git workflow strategies including GitFlow, GitHub Flow, and trunk-based development for team collaboration.",
        content: "Effective Git workflows are essential for team collaboration and code quality. This article compares popular workflows including GitFlow for feature-rich development, GitHub Flow for continuous deployment, and trunk-based development for high-velocity teams. We'll explore branching strategies, code review processes, merge vs rebase strategies, and automation techniques for maintaining code quality.",
        author: "Daniel Kim",
        date: "2024-01-22",
        category: "Git",
        readTime: "6 min read",
        tags: ["Git", "Version Control", "Workflow", "Collaboration"]
    },
    {
        id: 19,
        title: "API Testing with Postman",
        excerpt: "Comprehensive guide to API testing using Postman. Learn request automation, test scripting, and continuous integration setup.",
        content: "API testing ensures reliable backend services and smooth integration between systems. This guide covers Postman's testing capabilities including automated test scripts, environment variables, data-driven testing with CSV files, and continuous integration with Newman. We'll also explore API documentation generation, mock servers, and monitoring strategies for production APIs.",
        author: "Laura White",
        date: "2024-01-18",
        category: "Testing",
        readTime: "7 min read",
        tags: ["Testing", "API", "Postman", "Automation"]
    },
    {
        id: 20,
        title: "Microservices Architecture",
        excerpt: "Design and implement microservices architecture. Learn service discovery, communication patterns, and distributed system challenges.",
        content: "Microservices architecture enables building scalable, maintainable systems by breaking monolithic applications into smaller, independent services. This comprehensive guide covers service decomposition strategies, inter-service communication patterns, service discovery mechanisms, and distributed transaction management. We'll also explore API gateways, circuit breakers, monitoring distributed systems, and organizational considerations for microservices adoption.",
        author: "Michael Brown",
        date: "2024-01-15",
        category: "Architecture",
        readTime: "18 min read",
        tags: ["Microservices", "Architecture", "Distributed Systems", "Scalability"]
    }
];

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = blogData;
}