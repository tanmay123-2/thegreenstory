import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
        // This override fixes issues with Next.js Link, Image, and Lucide icons 
        // being recognized as invalid JSX elements under React 19 strict typings.
        type ElementType = string | React.JSXElementConstructor<any>;
        interface Element extends React.ReactElement<any, any> { }
        interface ElementClass extends React.Component<any> {
            render(): React.ReactNode;
        }
        interface ElementAttributesProperty { props: {}; }
        interface ElementChildrenAttribute { children: {}; }
        type LibraryManagedAttributes<C, P> = P;
        interface IntrinsicAttributes extends React.Attributes { }
        interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }
    }
}
