import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getTemplates } from "../../actions/template";
import TemplateItem from "./TemplateItem";
import PropTypes from "prop-types";

const Templates = ({ template: { templates }, getTemplates }) => {
  useEffect(() => {
    getTemplates();
  }, []);
  console.log(templates);
  return (
    <Fragment>
      {templates.map(template => (
        <TemplateItem key={template.id} template={template} />
      ))}
    </Fragment>
  );
};

Templates.propTypes = {
  templates: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  template: state.template
});

export default connect(
  mapStateToProps,
  { getTemplates }
)(Templates);
