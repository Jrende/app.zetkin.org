import { FC } from 'react';
import CallAssignmentModel, {
  CallAssignmentState,
} from 'features/callAssignments/models/CallAssignmentModel';
import { HeadsetMic, PhoneOutlined } from '@mui/icons-material';

import useModel from 'core/useModel';
import ActivityListItem, { STATUS_COLORS } from './ActivityListItem';

interface CallAssignmentListItemProps {
  orgId: number;
  caId: number;
}

const CallAssignmentListItem: FC<CallAssignmentListItemProps> = ({
  caId,
  orgId,
}) => {
  const model = useModel((env) => new CallAssignmentModel(env, orgId, caId));
  const state = model.state;
  const data = model.getData().data;
  const stats = model.getStats().data;

  if (!data) {
    return null;
  }

  let color = STATUS_COLORS.GRAY;
  if (
    state === CallAssignmentState.ACTIVE ||
    state === CallAssignmentState.OPEN
  ) {
    color = STATUS_COLORS.GREEN;
  } else if (state === CallAssignmentState.CLOSED) {
    color = STATUS_COLORS.RED;
  } else if (state === CallAssignmentState.SCHEDULED) {
    color = STATUS_COLORS.BLUE;
  }

  const blocked = stats?.blocked || 0;
  const ready = stats?.ready || 0;
  const done = stats?.done || 0;
  const callsMade = stats?.callsMade.toString() || '0';

  return (
    <ActivityListItem
      blueChipValue={ready}
      color={color}
      endNumber={callsMade}
      greenChipValue={done}
      href={`/organize/${orgId}/projects/${
        data.campaign?.id ?? 'standalone'
      }/callassignments/${caId}`}
      orangeChipValue={blocked}
      PrimaryIcon={HeadsetMic}
      SecondaryIcon={PhoneOutlined}
      title={data.title}
    />
  );
};

export default CallAssignmentListItem;
