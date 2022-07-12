declare const _default: {
    name: string;
    schema: {
        data: {
            type(): string;
            id({ data }: {
                data: any;
            }): any;
            untransformAttributes({ attributes }: {
                attributes: any;
            }): any;
            attributes({ data }: {
                data: any;
            }): {
                title: any;
                description: any;
                displayUrl: any;
            };
        };
    };
};
export default _default;
