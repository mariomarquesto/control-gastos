import { Modal } from "antd";
import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a modal for confirming deletion.
 */
const DeleteModal = ({
  deleteModalVisible,
  setDeleteModalVisible,
  confirmDelete,
}) => {
  return (
    <Modal
      title="Confirmar Eliminación"
      open={deleteModalVisible} 
      onOk={confirmDelete} 
      onCancel={() => setDeleteModalVisible(false)} 
      okText="Eliminar" 
      cancelText="Cancelar" 
      okButtonProps={{ danger: true }} 
    >
      <p>¿Seguro que quieres eliminar este registro? Esta acción no se puede deshacer.</p>
    </Modal>
  );
};

DeleteModal.propTypes = {
  deleteModalVisible: PropTypes.bool.isRequired,
  setDeleteModalVisible: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

export default DeleteModal;