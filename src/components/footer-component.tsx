import React from "react";

type FooterComponentProps = {};
type FooterComponentState = {};
class FooterComponent extends React.Component<FooterComponentProps, FooterComponentState> {
  constructor(props: FooterComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div className="pt-5 pb-5 px-3 bg-stone-200 dark:bg-slate-700">
        <div className="flex flex-col items-center">
          <p className="text-2xl">Thank You!</p>
          <p>This website uses affiliate links. Everytime you click a link and buy that product a small percentage goes to charity and towards helping support this website</p>
        </div>
      </div>

    )
  }
}

export default FooterComponent;