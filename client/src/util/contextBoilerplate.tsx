import React from 'react';

const getChild = (children) => (Array.isArray(children) ? children[0] : children);

export const combineContexts = (contexts) => ({
	Provider: ({ children, value }) =>
		Object.values(contexts).reduce(
			(tree, Context: any) => <Context.Provider value={value}>{tree}</Context.Provider>,
			children
		),
	Consumer: ({ children }) =>
		// @ts-ignore
		Object.entries(contexts).reduce(
			// @ts-ignore
			(tree, [ key, Context ]) => (values) => (
				// @ts-ignore
				<Context.Consumer>
					{(consumerValue) =>
						// @ts-ignore
						tree({
							...values,
							[key]: consumerValue
						})}
					// @ts-ignore
				</Context.Consumer>
			),
			(value) => getChild(children)(value)
		)()
});
