/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React from 'react';
import OverlayModal from '../OverlayModal';

const MoveInProcessModal = ({
  isMoveInProcess,
  onClose,
  onModalRef,
  onDay,
  steps,
  title
}) => {
  const onStepColor = 'green';
  return (
    <>
      {isMoveInProcess && (
        <OverlayModal close={onClose} modalRef={onModalRef} width={60}>
          <div className="moveinprocess">
            <h1>{title}</h1>
            {steps.map((step, index) => (
              <section key={index}>
                <h2
                  style={{
                    color: onDay === index + 1 ? onStepColor : 'inherit',
                  }}
                >
                  {index + 1}. {step.step}{' '}
                  {onDay === index + 1 && (
                    <span style={{ color: onStepColor }}>✔</span>
                  )}
                </h2>
                <ul
                  style={{
                    color: onDay === index + 1 ? onStepColor : 'inherit',
                  }}
                >
                  {step.subHeadings.map((subHeading, subIndex) => (
                    <li key={subIndex}>
                      <h3
                        style={{
                          color: onDay === index + 1 ? onStepColor : 'inherit',
                        }}
                      >
                        {index + 1}.{subIndex + 1} {subHeading.subHeading}
                      </h3>
                      <ul>
                        {subHeading.points.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </OverlayModal>
      )}
    </>
  );
};

export default MoveInProcessModal;
